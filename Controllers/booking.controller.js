// import format from 'date-fns';

const rooms = [
     {
        room_id: 1,
        room_name: 'room-1',
        room_status: "available",
        amenities: "AC,TV,Heater,WashingMachine,Ironer",
        seats:4,
        price_per_hrs: 1000
    },
    {
        room_id: 2,
        room_name: 'room-2',
        room_status: "available",
        amenities: "AC,TV,Heater,WashingMachine,Ironer",
        seats:4,
        price_per_hrs: 2000
    },
    {room_id: 3,
        room_name: 'room-3',
        room_status: "available",
        amenities: "AC,TV,Heater,WashingMachine,Ironer",
        seats:4,
        price_per_hrs: 3000
    }
]
let bookingRoom = []

//CREATE ROOM
export const createRoom = async (req,res)=>{
      try{
        let id = rooms.length ? rooms[rooms.length -1].room_id +1:1
        req.body.room_id = id
        rooms.push(req.body)
        await res.status(200).json({
            Message: "Room Created Successfully", Room: rooms
        })
      } catch (error) {
        res.status(500).json({
            comment: 'Internal server Error'
        })
      }


}

//List Room Data

export const getAllRoom = (req,res) =>{
    try{
        res.status(200).json({
            message:"Successfully Listed",rooms
        })
    }catch (error){
        res.status(500).json({
            message:"Internal Error"
        })
    }
}

//



//BOOK ROOM

export const bookRoom = (req,res) =>{
    try{
        let {customer_name,date,start_time,end_time,roomID}=req.body;
        let room= rooms.filter((e)=>e.room_status === "available" && e.room_id ==roomID)
        console.log(room);
        if ((!room)) {
            return res.status(400).json({
                message:'Room is not available'
            })

        }
        else {
            let bookingRoomsdate = bookingRoom.filter((room)=>room.booking_date ===date)
            if (bookingRoomsdate.length>0){
                console.log('true block');
                return res.status(400).json({
                    message:'date is not available'
                })           
            } else{
                console.log('false block');
                let booking = {
                    customer_name,
                    start_time,
                    end_time,
                    roomID,
                    Date: date,
                    booking_id : bookingRoom.length +1,
                    booking_date: date,
                    status: "booked"

                }
                bookingRoom.push(booking)
                return res.status(200).json({
                    message: "Successfully Booked",BookingRoom: bookingRoom,
                })
            }
        }
    }catch (error){
        res.status(500).json({
            message:"Internal Error"
        })

    }
}

//Booked data

export const bookedRoom = (req,res)=>{
    try{
        res.status(200).json({
            message: "Succesfully Listed the Room with Booked Details", bookingRoom
        })
    }catch(error){
        res.status(500).json({
            message:"Internal Error"
        })
    }
}

 export const getAllCustomerData = async (req,res)=>{
    try{
        const customerList = bookingRoom.map((booking)=>{
            const room = rooms.find((a)=>a.room_id === booking.roomID)
            return{
                Customer_Name: booking.customer_name,
                Room_Name: room? rooms.room_name: null,
                Date: booking.Date,
                start_time: booking.start_time,
                end_time: booking.end_time
            }
        })
        await res.status(200).json({
            message:"Successfully listed all customer details",
            customerList
        })
    }catch(error){
        res.status(500).json({
            message:"Internal Error"
        })
    }
}

//Booking count

export const bookCount = (req,res)=>{
    try{
        const {customer_name} = req.params;
        console.log('Requested Customer Name:',customer_name);
        const customerBooking = bookingRoom.filter((e)=>{
            console.log('Booking Customer Name:',e.customer_name);
            return e.customer_name ===customer_name;
        });
        console.log('Customer Booking:', customerBooking);
        res.status(200).json({
            message:'Successfully Listed',
            customer_name,
            booking_count: bookingRoom.length,
            bookings: bookingRoom
        });

    }catch(error){
        res.status(500).json({
            message:"Internal Error"
        });
    }
}

