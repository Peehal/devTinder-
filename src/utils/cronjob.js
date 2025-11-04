const cron = require("node-cron");
const {subDays, startOfDay, endOfDay} = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../Models/connectionRequest")

cron.schedule(" 0 8 * * * ", async() =>{
    // code for the sending emails to all the persons who have received the emails 

    try {

        const yesterday = subDays(new Date() , 64);

        const yesterdayStart = startOfDay(yesterday);
        const yesterdayEnd = endOfDay(yesterday);

        const pendingRequests = await ConnectionRequestModel.find({
            status :"interested",
            createdAt:{
                $gte: yesterdayStart,
                $lt: yesterdayEnd,
            },
        }).populate("fromUserId toUserId");

        const listOfEmails = [...new Set(pendingRequests.map(req => req.toUserId.emailID))]


        console.log(listOfEmails);

        for (const email of listOfEmails){
            //  Sending Emails

            try{
                const res = await sendEmail.run(
                    "Pending friend Request" + email,
                    "Please Login to Devorbits.in"
                );
                console.log(res);
                
            }
            catch(error){
                console.log(error);
            }
        }

    } catch (error) {
        console.error(error);
    }
});

