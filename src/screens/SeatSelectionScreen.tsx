// import { useFocusEffect, useRoute } from '@react-navigation/native';
// import React, { useCallback, useState } from 'react'
// import { bookTicket, fetchBusDetails } from '../service/requests/bus';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { ActivityIndicator, Alert, ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native';
// import { goBack, navigate, resetAndNavigate } from '../utils/NavigationUtils';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid';
// import TicketModal from '../components/ui/TicketModal';
// import PaymentButton from '../components/ui/PaymentButton';
// import Seat from '../components/ui/Seat';
// import { createOrder, verifyOrder } from '../service/requests/payment';
// import { openRazorpayCheckout } from '../service/requests/razorpay';
// import { useVerifyPayment } from '../queries/payment/useVerifyPayment';

// const SeatSelectionScreen = () => {
//     const [ticketVisible, setTicketVisible] = useState(false);
//     const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
//     const route = useRoute();
//     const {busId} = route.params as {busId: string};

//     const {data, isLoading, isError, refetch} = useQuery({
//         queryKey: ['busDetails', busId],
//         queryFn: () => fetchBusDetails(busId),
//     });

//     const busInfo = data;

//     const verifyPayment = useVerifyPayment()
//     useFocusEffect(
//         useCallback(()=>{
//             refetch();
//         }, [busId]),
//     );


//     const bookTicketMutation = useMutation({
//         mutationFn: (ticketData: {
//             busId: string;
//             date: string;
//             seatNumbers: number[];
//         }) => bookTicket(ticketData),
//         onSuccess: busInfo => {
//             console.log('Ticket booked successfuly:', busInfo);
//             setTicketVisible(true);
//         },
//         onError: error => {
//             console.log('Error booking ticket:', error);
//             Alert.alert('Failed to book ticket. Please try again.')
//         }
//     })

//     const handleSeatSelection = (seat_id: number) => {
//         setSelectedSeats(prev => 
//             prev.includes(seat_id) ?
//                 prev.filter(id => id !== seat_id) : 
//                 [...prev, seat_id],
//         );
//     };

//     const createOrderMutaion = useMutation({
//         mutationFn: (amount: number)=> createOrder(amount),
//         onSuccess: async (orderData) => {
//             console.log(`Order created succesfully`, orderData);
//             const result = await openRazorpayCheckout(orderData);

//             verifyPaymentMutation.mutate(result);
//         },
//         onError: error => {
//             console.log("Payment Error", "Failed to create order", error.message)
//         }
//     });

//     const verifyPaymentMutation = useMutation({
//         mutationFn: (verifyData: {
//             razorpay_signature: string;
//             razorpay_order_id: string;
//             razorpay_payment_id: string;
//         }) => verifyOrder(verifyData),
//         onSuccess: (data) => {
//             console.log('Payment verification succesfull.')
//             bookTicketMutation.mutate({
//             busId,
//             seatNumbers: selectedSeats,
//             date: new Date(busInfo.departureTime).toISOString(),
//         })
//         },
//         onError: (error) => {
//             console.log('Payment verification failed.')
//             navigate('PaymentFailedScreen');
//         }
//     })

//     const handleOnPay = async () => {
//         if(selectedSeats.length === 0){
//             Alert.alert('Please select at least one seat.');
//             return;
//         }
//         createOrderMutaion.mutate(busInfo.price);
//     }



//     if(isLoading){
//         return (
//             <View className='flex-1 items-center justify-center'>
//                 <ActivityIndicator size='large' color='teal'/>
//                 <Text className='text-gray-500 mt-2'>Loading bus details.....</Text>
//             </View>
//         )
//     }

//     if(isError){
//         return (
//             <View className='flex-1 items-center justify-center'>
//                 <Text className='text-red-500'>Failed to load bus details.</Text>
//                 <TouchableOpacity onPress={()=>goBack()}>
//                     <Text className='text-blue-500'>Go Back</Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }
//   return (
//     <View className='flex-1 bg-white'>
//         <SafeAreaView/>
//         <View className='bg-white p-4 flex-row items-center border-b-[1px] border-teal-400'>
//             <TouchableOpacity onPress={()=>goBack()}>
//                 <ArrowLeftIcon size={24} color='#000'/>
//             </TouchableOpacity>

//             <View className='ml-4'>
//                 <Text className='text-lg font-bold'>Seat Selection</Text>
//                 <Text className='text-sm text-gray-500'>{busInfo?.from} 👉 {busInfo?.to}</Text>
//                 <Text className='text-sm text-gray-500'>
//                     {new Date(busInfo?.departureTime).toLocaleTimeString([], {
//                         hour: '2-digit',
//                         minute: '2-digit',
//                     })}{' '}

//                     {new Date(busInfo.departureTime).toLocaleDateString()}
//                 </Text>
//             </View>
//         </View>


//         <ScrollView
//             showsVerticalScrollIndicator={false}
//             contentContainerStyle={{paddingBottom:200}}
//             className='pb-20 bg-teal-100 p-4'>
            
//             <Seat
//                 selectedSeats={selectedSeats}
//                 seats={busInfo?.seats}
//                 onSeatSelect={handleSeatSelection}
//             />
                
//             <View className='bg-white rounded-lg p-4 drop-shadow-sm'>
//                 <View className='flex-row justify-between items-center mb-2'>
//                     <Text className='text-lg font-semibold'>{busInfo?.company}</Text>
//                     <View className='flex-row items-center'>
//                         <StarIcon size={18} color="gold" />
//                         <Text className='ml-1 text-gray-600 text-sm'>
//                             {busInfo?.rating} ({busInfo?.totalReviews})
//                         </Text>
//                     </View>
//                 </View>


//                 <Text className='text-s text-gray-600 mb-1'>{busInfo?.busType}</Text>
                
//                 <View className='flex-row justify-between mt-2'>
//                     <View className='items-center'>
//                         <Text className='text-lg font-bold'>
//                             {new Date(busInfo?.departureTime).toLocaleTimeString([], {
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                             })}
//                         </Text>
//                         <Text className='text-sm text-gray-500'>Departure</Text>

//                     </View>
//                     <View className='items-center'>
//                         <Text className='text-lg font-bold'>
//                             {new Date(busInfo?.arrivalTime).toLocaleTimeString([], {
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                             })}
//                         </Text>
//                         <Text className='text-sm text-gray-500'>Arrival</Text>
//                     </View>
//                 </View>

//                 <View className='mt-3 text-green-600 text-sm'>
//                     <Text className='mt-3 text-green-600 text-sm'>
//                         {
//                             busInfo?.seats?.flat().filter((seat: any)=>!seat.booked).length
//                         }{' '}
//                         Seats Available
//                     </Text>
//                 </View>

//                 <View className='flex-row items-center mt-2'>
//                     <Text className='text-gray-400 line-through text-lg'>
//                        ₹ {busInfo?.originalPrice}
//                     </Text>
//                     <Text className='text-xl text-black font-bold ml-2'>
//                        ₹ {busInfo?.price} (1/P)
//                     </Text>
//                 </View>

//                 <View className='flex-row gap-2 mt-3'>
//                     {
//                         busInfo?.badges?.map((badge: string, index: number)=> (
//                             <View 
//                                 key={index}
//                                 className='bg-yellow-200 px-2 py-1 rounded-full'>
//                                     <Text className='text-xs text-yellow-800 font-semibold'>
//                                         {badge}
//                                     </Text>
//                             </View>
//                         ))
//                     }

//                 </View>
//             </View>


//         </ScrollView>

//         <PaymentButton 
//             seat={selectedSeats.length}
//             price={busInfo.price}
//             onPay={handleOnPay}
//         />


//         {ticketVisible && (
//             <TicketModal
//                 bookingInfo={{
//                     from: busInfo.from,
//                     to: busInfo.to,
//                     departureTime: new Date(busInfo.departureTime).toLocaleTimeString(
//                         [],
//                         {
//                             hour: '2-digit',
//                             minute: '2-digit',
//                         },
//                     ),
//                     arrivalTime: new Date(busInfo.arrivalTime).toLocaleTimeString([],{
//                         hour: '2-digit',
//                         minute: '2-digit'
//                     }),
//                     date: new Date(busInfo.departueTime).toDateString(),
//                     company: busInfo.company,
//                     busType: busInfo.busType,
//                     seats: bookTicketMutation.data?.seatNumber,
//                     ticketNumber: bookTicketMutation.data?._id || 'TU3511709689',
//                     pnr: bookTicketMutation.data?.pnr || 'PNR123456789',
//                     fare: `${busInfo.price * selectedSeats.length}`
//                 }}
//                 onClose={()=>{
//                     resetAndNavigate('HomeScreen');
//                     setTicketVisible(false);
//                 }}
//                 visible={ticketVisible}
//             />
//         )}
//     </View>
//   )
// }

// export default SeatSelectionScreen;



import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback, useState } from 'react'
import { bookTicket, fetchBusDetails } from '../service/requests/bus';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ActivityIndicator, Alert, ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { goBack, navigate, resetAndNavigate } from '../utils/NavigationUtils';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/solid';
import TicketModal from '../components/ui/TicketModal';
import PaymentButton from '../components/ui/PaymentButton';
import Seat from '../components/ui/Seat';
import { createOrder, verifyOrder } from '../service/requests/payment';
import { openRazorpayCheckout } from '../service/requests/razorpay';
import { useVerifyPayment } from '../queries/payment/useVerifyPayment';
import { useCreateOrder } from '../queries/payment/useCreateOrder';
import { useBookTicket } from '../queries/booking/useBookTicket';

const SeatSelectionScreen = () => {
    const [ticketVisible, setTicketVisible] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
    const [ticketData, setTicketData] = useState<any>({});
    const route = useRoute();
    const {busId} = route.params as {busId: string};

    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ['busDetails', busId],
        queryFn: () => fetchBusDetails(busId),
    });

    const busInfo = data;

    console.log('this is busInfo', busInfo)

    const bookTicketMutation = useBookTicket();
    const createOrderMutaion = useCreateOrder();
    const verifyPaymentMutation = useVerifyPayment();

    useFocusEffect(
        useCallback(()=>{
            refetch();
        }, [busId]),
    );


    // const bookTicketMutation = useMutation({
    //     mutationFn: (ticketData: {
    //         busId: string;
    //         date: string;
    //         seatNumbers: number[];
    //     }) => bookTicket(ticketData),
    //     onSuccess: busInfo => {
    //         console.log('Ticket booked successfuly:', busInfo);
    //         setTicketVisible(true);
    //     },
    //     onError: error => {
    //         console.log('Error booking ticket:', error);
    //         Alert.alert('Failed to book ticket. Please try again.')
    //     }
    // })

    const handleSeatSelection = (seat_id: number) => {
        setSelectedSeats(prev => 
            prev.includes(seat_id) ?
                prev.filter(id => id !== seat_id) : 
                [...prev, seat_id],
        );
    };

    // const createOrderMutaion = useMutation({
    //     mutationFn: (amount: number)=> createOrder(amount),
    //     onSuccess: async (orderData) => {
    //         console.log(`Order created succesfully`, orderData);
    //         const result = await openRazorpayCheckout(orderData);

    //         verifyPaymentMutation.mutate(result);
    //     },
    //     onError: error => {
    //         console.log("Payment Error", "Failed to create order", error.message)
    //     }
    // });

    // const verifyPaymentMutation = useMutation({
    //     mutationFn: (verifyData: {
    //         razorpay_signature: string;
    //         razorpay_order_id: string;
    //         razorpay_payment_id: string;
    //     }) => verifyOrder(verifyData),
    //     onSuccess: (data) => {
    //         console.log('Payment verification succesfull.')
    //         bookTicketMutation.mutate({
    //         busId,
    //         seatNumbers: selectedSeats,
    //         date: new Date(busInfo.departureTime).toISOString(),
    //     })
    //     },
    //     onError: (error) => {
    //         console.log('Payment verification failed.')
    //         navigate('PaymentFailedScreen');
    //     }
    // })

    const handleBookTicket = async (ticketData: {busId: string; date: string, seatNumbers: number[]}) => {
        bookTicketMutation.mutate(ticketData, {
            onSuccess: busInfo => {
                console.log('Ticket booked successfuly:', busInfo);
                setTicketData(busInfo);
                setTicketVisible(true);

        },
            onError: error => {
                console.log('Error booking ticket:', error);
                Alert.alert('Failed to book ticket. Please try again.')
        }
        })
    }

    const handleVerifyPayment = async (result: {
            razorpay_signature: string;
            razorpay_order_id: string;
            razorpay_payment_id: string;
        }) => {
        verifyPaymentMutation.mutate(result, {
            onSuccess: (data) => {
                console.log('Payment verification succesfull.')
                handleBookTicket({
                    busId,  
                    seatNumbers: selectedSeats, 
                    date: new Date(busInfo.departureTime).toISOString(),
                })
        },
            onError: (error) => {
                console.log('Payment verification failed.')
                navigate('PaymentFailedScreen');
            }
        })
    }

    const handleOnPay = async () => {
        if(selectedSeats.length === 0){
            Alert.alert('Please select at least one seat.');
            return;
        }
        createOrderMutaion.mutate(busInfo.price, {
            onSuccess: async (orderData) => {
                console.log(`Order created succesfully`, orderData);
                const result = await openRazorpayCheckout(orderData);
                handleVerifyPayment(result); 
            },
            onError: error => {
                console.log("Payment Error", "Failed to create order", error.message)
            }
        });
    }



    if(isLoading){
        return (
            <View className='flex-1 items-center justify-center'>
                <ActivityIndicator size='large' color='teal'/>
                <Text className='text-gray-500 mt-2'>Loading bus details.....</Text>
            </View>
        )
    }

    if(isError){
        return (
            <View className='flex-1 items-center justify-center'>
                <Text className='text-red-500'>Failed to load bus details.</Text>
                <TouchableOpacity onPress={()=>goBack()}>
                    <Text className='text-blue-500'>Go Back</Text>
                </TouchableOpacity>
            </View>
        )
    }
  return (
    <View className='flex-1 bg-white'>
        <SafeAreaView/>
        <View className='bg-white p-4 flex-row items-center border-b-[1px] border-teal-400'>
            <TouchableOpacity onPress={()=>goBack()}>
                <ArrowLeftIcon size={24} color='#000'/>
            </TouchableOpacity>

            <View className='ml-4'>
                <Text className='text-lg font-bold'>Seat Selection</Text>
                <Text className='text-sm text-gray-500'>{busInfo?.from} 👉 {busInfo?.to}</Text>
                <Text className='text-sm text-gray-500'>
                    {new Date(busInfo?.departureTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}{' '}

                    {new Date(busInfo.departureTime).toLocaleDateString()}
                </Text>
            </View>
        </View>


        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:200}}
            className='pb-20 bg-teal-100 p-4'>
            
            <Seat
                selectedSeats={selectedSeats}
                seats={busInfo?.seats}
                onSeatSelect={handleSeatSelection}
            />
                
            <View className='bg-white rounded-lg p-4 drop-shadow-sm'>
                <View className='flex-row justify-between items-center mb-2'>
                    <Text className='text-lg font-semibold'>{busInfo?.company}</Text>
                    <View className='flex-row items-center'>
                        <StarIcon size={18} color="gold" />
                        <Text className='ml-1 text-gray-600 text-sm'>
                            {busInfo?.rating} ({busInfo?.totalReviews})
                        </Text>
                    </View>
                </View>


                <Text className='text-s text-gray-600 mb-1'>{busInfo?.busType}</Text>
                
                <View className='flex-row justify-between mt-2'>
                    <View className='items-center'>
                        <Text className='text-lg font-bold'>
                            {new Date(busInfo?.departureTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Text>
                        <Text className='text-sm text-gray-500'>Departure</Text>

                    </View>
                    <View className='items-center'>
                        <Text className='text-lg font-bold'>
                            {new Date(busInfo?.arrivalTime).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </Text>
                        <Text className='text-sm text-gray-500'>Arrival</Text>
                    </View>
                </View>

                <View className='mt-3 text-green-600 text-sm'>
                    <Text className='mt-3 text-green-600 text-sm'>
                        {
                            busInfo?.seats?.flat().filter((seat: any)=>!seat.booked).length
                        }{' '}
                        Seats Available
                    </Text>
                </View>

                <View className='flex-row items-center mt-2'>
                    <Text className='text-gray-400 line-through text-lg'>
                       ₹ {busInfo?.originalPrice}
                    </Text>
                    <Text className='text-xl text-black font-bold ml-2'>
                       ₹ {busInfo?.price} (1/P)
                    </Text>
                </View>

                <View className='flex-row gap-2 mt-3'>
                    {
                        busInfo?.badges?.map((badge: string, index: number)=> (
                            <View 
                                key={index}
                                className='bg-yellow-200 px-2 py-1 rounded-full'>
                                    <Text className='text-xs text-yellow-800 font-semibold'>
                                        {badge}
                                    </Text>
                            </View>
                        ))
                    }

                </View>
            </View>


        </ScrollView>

        <PaymentButton 
            seat={selectedSeats.length}
            price={busInfo.price}
            onPay={handleOnPay}
        />


        {ticketVisible && (
            <TicketModal
                bookingInfo={{
                    from: busInfo.from,
                    to: busInfo.to,
                    departureTime: new Date(busInfo.departureTime).toLocaleTimeString(
                        [],
                        {
                            hour: '2-digit',
                            minute: '2-digit',
                        },
                    ),
                    arrivalTime: new Date(busInfo.arrivalTime).toLocaleTimeString([],{
                        hour: '2-digit',
                        minute: '2-digit'
                    }),
                    date: new Date(busInfo.departureTime).toDateString(),
                    company: busInfo.company,
                    busType: busInfo.busType,
                    seats: ticketData?.seatNumbers,
                    ticketNumber: ticketData?._id || 'TU3511709689',
                    pnr: ticketData.pnr || 'PNR123456789',
                    fare: `${busInfo.price * selectedSeats.length}`
                }}
                onClose={()=>{
                    resetAndNavigate('HomeScreen');
                    setTicketVisible(false);
                }}
                visible={ticketVisible}
            />
        )}
    </View>
  )
}

export default SeatSelectionScreen;
