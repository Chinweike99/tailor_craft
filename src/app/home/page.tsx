'use client'

import React, { useEffect, useState } from 'react'

interface Details  {
    name: string;
    email: string;
    phone: number;
}

const HomePage = () => {

    const [user, setUser] = useState<Details>({
        name: "Default name",
        email: "user@gmai.com",
        phone: 912235880,
    });

    useEffect(() => {
        setUser(user);
        console.log(user);
    }, [user])

  return (
    <div>{user.name}</div>
  )
}

export default HomePage;