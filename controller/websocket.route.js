const io = require("../server.js").io
const authws = require("../middleware/authws.js")
const deliveries = require("../model/deliveries.model.js")
const chat = require("../model/chat.model.js")
const projectFunctions = require("../repository/project.repository.js")
const userFunctions = require("../repository/user.repository.js")
const reviewerFunctions = require("../repository/reviewer.repository.js")

const updateNamespace = io.of('/api/update'); //defer connection till page loads.
var clientSockets = []

updateNamespace.on('connection', (socket) => {
    console.log("A client connected to update namespace")
    const 
    token = authws(socket)
    if(!token)         //endpoint protection
    {
        return; 
    }
    socket.on('disconnect', () => {
    clientSockets = clientSockets.filter(item => item.socket !== socket)
    console.log('A client disconnected from the update namespace');
    })

    
    clientSockets.push({socket,token})

    
})


const changeStream = deliveries.watch()

changeStream.on('change', async (change) => {
    if(change.operationType!="insert")
    {
        return
    }
    const entry = change.fullDocument
    console.log(clientSockets)
    for(item of clientSockets)
    {
        const socket=item.socket
        const token = item.token
        
        const project_id=socket.handshake.query.project.toString()
        const user_id=socket.handshake.query.user.toString()    
        const reviewer_id=socket.handshake.query.reviewer.toString()

        const document_project = entry.projectID.toString()
        const document_user = entry.user.toString()
        const document_reviewer = entry.reviewer.toString()

        var jwt_user 
        if(token.type=="user")
        jwt_user = await userFunctions.getUser(token.username) 
        else
        jwt_user = await reviewerFunctions.getReviewer(token.username)

        if(jwt_user._id != user_id && jwt_user._id != reviewer_id)
        {
            //logged in credentials are not the same as advertised credentials(in query parameters)
            return 
        }

        if(project_id==document_project && user_id==document_user && reviewer_id==document_reviewer)
        {
            socket.emit('update', entry.message)
        }

    }
  })

const chatNamespace = io.of('/api/chat')

chatNamespace.on('connection',async (socket) => {

    console.log("A client connected to chat namespace")

    socket.on('disconnect', () => {
    console.log('A client disconnected from the chat namespace');
    })

    const token = authws(socket)
    if(!token)         //endpoint protection against tampered token
    {
        return; 
    }

    const project_id=socket.handshake.query.project.toString()
    const project = await projectFunctions.getProjectByID(project_id)
    var jwt_user 
    if(token.type=="user")
    jwt_user = await userFunctions.getUser(token.username) 
    else
    jwt_user = await reviewerFunctions.getReviewer(token.username)

    if(jwt_user._id != project.projectManager && jwt_user._id != project.reviewer)
    {
        //not permitted to chat about this project
        return 
    }
    
    
    socket.join(project_id)
    
    //console.log(io.sockets.adapter.rooms)
    
    
    
    
    socket.on('message', async (data) => {
        
        let data_ob  = {
            sender: data.sender,
            receiver: data.receiver,
            projectID: data.projectID,
            message : data.message,
        }
        await new chat(data_ob).save().catch(error => console.log(error.message)); //in receiver check that sender id is not the same 
        


        const adapter = chatNamespace.in(project_id).adapter;
        const socketsInRoom = [...adapter.rooms.get(project_id) || []];
        
        for (const socketId of socketsInRoom) 
        {
        
        const socketInRoom = chatNamespace.sockets.get(socketId);
        if(socket.handshake.headers['authorization'] != socketInRoom.handshake.headers['authorization'])
        socketInRoom.emit('message', data_ob)
        else if(socket!=socketInRoom)
        socketInRoom.emit('push-message', data_ob)
        
        }
    })
    
})










