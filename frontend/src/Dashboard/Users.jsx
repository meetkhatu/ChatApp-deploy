import React from 'react'
import User from '../Components/User'
import useGetAllUsers from '../Context/useGetAllUsers'


const Users = () => {
        const [allUsers, loading] = useGetAllUsers()
        console.log(allUsers)
    return (
        <div style={{maxHeight: "calc(70vh)"}} className='overflow-y-auto'>
            {
                allUsers.map((user,index) => {
                    return <User key={index} user={user} />
                })
                
            }
        </div>
    )
}

export default Users
