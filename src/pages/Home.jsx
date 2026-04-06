import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
export default function Home() {
    const [pedidos, setPedidos] = useState([])
    const nombre = localStorage.getItem("username")
    const navigate = useNavigate()
    function salir() {
        localStorage.clear()
        navigate("/Login")
    }
    useEffect(() => {
        async function traerData() {
            const token = localStorage.getItem("token")
            const res = await fetch("https://api-funval-g6.onrender.com/orders/", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
            })
            const data = await res.json()
            setPedidos(data)
            console.log(data)
        }
        traerData()
    }, [])
    return (
        <div className='flex items-center justify-center font-bold  flex-col gap-4'>
            Bienvenido al Sistema!!{nombre}
            <div className='grid grid-cols-3 gap-3'>
                {pedidos.map((info) => {
                    return <>
                        <a
                            href="#"
                            className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {info.user_id}
                            </h5>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {info.total}$
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {info.status}
                            </p>
                        </a>

                    </>
                })}
            </div>
            <button onClick={salir} className='bg-red-900 text-white p-2 rounded-2xl'>salir del sistema</button>
        </div>
    )
}
