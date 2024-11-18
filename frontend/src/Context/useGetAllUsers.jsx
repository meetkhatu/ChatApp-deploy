import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie'
import axios from "axios";
function useGetAllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getUsers = async () => {
            setLoading(true);
            try {
                const token = Cookies.get("jwt");
                console.log(token)
                const response = await axios.get("https://mychat-4ayr.onrender.com/user/getUserProfile", {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response)
                setAllUsers(response.data.filteredUsers);
                setLoading(false);
            } catch (error) {
                console.log("Error in useGetAllUsers: " + error);
            }
        };
        getUsers();
    }, [allUsers,setAllUsers]);
    return [allUsers, loading];
}

export default useGetAllUsers;