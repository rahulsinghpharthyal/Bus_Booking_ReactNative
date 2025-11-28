import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native';
import { UserGroupIcon } from 'react-native-heroicons/solid';

const PaymentButton = ({price, seat, onPay}: {price: number; seat: number; onPay: any; }) => {
  return (
    <View className='absolute bottom-0 shadow-md bg-white border-t-2 w-full rounded-t-xl p-4'>
      <View className='flex-row items-center justify-between'>
        <View>
          <Text className='font-semibold font-okra text-xl'>Amount</Text>
          <Text className='font-okra font-medium text-gray-700 text-sm'>Tax Included</Text>
        </View>

        <View>
          <View className='flex-row item-center gap-3'>
            <Text className='text0gray-500 line-through font-okra font-medium text-sm'>
             ₹ {(seat * price - (seat * price > 200 ? 100 : 0)).toFixed(0)}
            </Text>
            <Text className='font-okra font-medium text-lg'>
             ₹ {(price * seat).toFixed(0)}
            </Text>
          </View>
          
          <View className='flex-row self-end items-center gap-1'>
            <UserGroupIcon color={'gray'} size={16}/>
            <Text className='font-okra font-medium text-md'>{seat} P</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={onPay}
        className='bg-tertiary my-4 rounded-xl justify-center items-center p-3'
      >
        <Text className='text-white font-semibold text-xl font-okra'>Pay Now!</Text>

      </TouchableOpacity>
    </View>
  )
}

export default PaymentButton;
