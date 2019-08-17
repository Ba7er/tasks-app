const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const sendWelcomEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'abdelellah.dev@gmail.com',
        subject: 'Thanks for joining in ',
        text : `Welcome to the app , ${name}, let me know how you get along with the app` 
    }).catch((e) =>{
        console.log(e)
    })
}

const sendCancelEmail = (email, name) =>{
    sgMail.send({
        to: email,
        from: 'abdelellah.dev@gmail.com',
        subject: 'Good Bye! ',
        text : `Sorry that we lost you  ${name}` 
    }).catch((e) =>{
        console.log(e)
    })
}

module.exports = {
    sendWelcomEmail,
    sendCancelEmail
}




// sgMail.setApiKey(sendgridAPIKey)
// sgMail.send({
//     to: 'abdelellah.dev@gmail.com',
//     from: 'abdelellah.dev@gmail.com',
//     subject: 'taskAPp',
//     text: 'I hope the task app is ok '
// })
