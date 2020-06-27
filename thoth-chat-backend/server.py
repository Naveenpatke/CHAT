import sqlalchemy
from flask import request, Flask
from flask import jsonify
from flask_socketio import join_room, leave_room
from flask_socketio import emit
import json

from app import socketio, app, db
import models

client_room = dict()

job = {}

@socketio.on('disconnect')
def disconnect():
    print("disconnect")
    client_room.pop(request.sid, None)


@socketio.on('chat')
def handle_message(data):
    data = json.loads(data)
    print(type(data))
    print(data)
    message_to_add = models.Message(sender_id=int(data["sender_id"]), conversation_id=int(data["conversation_id"]),
                                    content=str(data["content"]))
    db.session.add(message_to_add)
    db.session.commit()
    data["time_stamp"] = str(message_to_add.sent_time)
    print(request.sid)
    messages = models.Message.query.filter(models.Message.conversation_id == int(data["conversation_id"])).all()
    messages = map(lambda message: {"sender_id": message.sender_id,
                                    "content": message.content, "time_stamp": str(message.sent_time),
                                    "conversation_id": message.conversation_id}, messages)
    #print(list(messages))
    emit('chat', list(messages), room=client_room.get(request.sid))


@socketio.on('join')
def on_join(data):
    data = json.loads(data)
    join_room(data['room_id'])
    current_room = data['room_id']
    client_room[request.sid] = current_room
    print(f"joined room {current_room}")
    print(client_room)


@socketio.on('leave')
def on_leave():
    if client_room.get(request.sid) is not None:
        leave_room(client_room.get(request.sid))
        print(f"left room {client_room.get(request.sid)}")


# for getting messages involved in a conversation

@app.route('/conversation/<int:conversation_id>', methods=['GET'])
def conversation(conversation_id):
    messages = models.Message.query.filter(models.Message.conversation_id == conversation_id).all()
    # if len(messages) == 0:
    #     response = {'message': f'no messages found for the conversation id {conversation_id}'}
    #     return jsonify(response)
    messages = map(lambda message: {"sender_id": message.sender_id,
                                    "content": message.content, "time_stamp": str(message.sent_time),
                                    "conversation_id": message.conversation_id}, messages)
    return jsonify(list(messages))


@app.route('/create_room', methods=['POST'])
def create_room():
    room_name = request.json.get('room_name')
    room = models.Conversation(conversation_name=room_name)
    print(room)
    for user_id in request.json.get('user_ids'):
        user = models.User.query.filter(models.User.id == user_id).first()
        room.users_in_this_conversation.append(user)
        print(user)
    db.session.add(room)
    db.session.commit()
    response = {'conversation_name': room_name, 'conversation_id': room.conversation_id}
    return "User registered succesfully"


@socketio.on('upload_attachments')
def attachment(data):
    file = data['file']
    print('==================================')
    print(data['file'])
    print('==================================')
    attachment_path = app.root_path + "/attachments/" + file
    with open(attachment_path, 'wb') as file:
        file.write(data['contents'])

    if data['caption'] is "":
        caption = "attachment"
    else:
        caption = data["caption"]

    # if (job.get(f"conversation{data['conversation_id']}").get('ack') ==
    #         job.get(f"conversation{data['conversation_id']}").get('all')):
    #     attachment_to_add = models.Message(sender_id=int(data["sender_id"]),
    #                                        conversation_id=int(data["conversation_id"]),
    #                                        content=caption, attachment_path=attachment_path, status="read")
    # else:
    attachment_to_add = models.Message(sender_id=int(data["sender_id"]),
                                           conversation_id=int(data["conversation_id"]),
                                           content=caption, attachment_path=data['file'])

    try:
        db.session.add(attachment_to_add)
        db.session.commit()
    except sqlalchemy.exc.IntegrityError:
        print("please enter different attachment")

    messages = models.Message.query.filter(models.Message.conversation_id == int(data["conversation_id"])).all()
    messages = map(lambda message: {"sender_id": message.sender_id,"attachment_path":message.attachment_path,
                                    "content": message.content, "time_stamp": str(message.sent_time),
                                    "conversation_id": message.conversation_id}, messages)
    print('=================')
    print(list(messages))
    print('=================')
    for message in list(messages):
        if message.attachment_path.length > 0:
            message.content = data['contents']
    print('=================')
    print(list(messages))
    print('=================')
    emit('chat', list(messages), room=client_room.get(request.sid))


if __name__ == '__main__':
    socketio.run(app, debug=True)
