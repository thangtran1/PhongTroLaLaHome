import React from 'react'
import moment from 'moment'
import 'moment/locale/vi'
const Sitem = ({ title, price, image, createdAt }) => {
    const formatTime = createdAt => {
        moment.locale('vn')
        return moment(createdAt).fromNow()
    }
    return (
        <div className='w-full flex items-center gap-2  border-b border-gray-400 py-2'>
            <img
                className='w-[65px] h-[65px] object-cover rounded-md flex-none '
                src={image[0]} alt='ảnh sitem' />
            <div className=' w-full flex-auto flex flex-col justify-between gap-1 '>
                <h4 className='text-blue-600 text-[14px]'>{`${title?.slice(0, 45)}...`}</h4>
                <div className='flex items-center justify-between w-full'>
                    <span className='text-sm font-medium text-green-500'>{price}</span>
                    <span className='text-sm text-gray-400'>{formatTime(createdAt)}</span>
                </div>
            </div>
        </div>
    )
}

export default Sitem