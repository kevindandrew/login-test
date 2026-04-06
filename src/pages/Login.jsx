import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value, })

    }
    async function handleSubmit(e) {
        e.preventDefault()
        console.log("formulario enviado")
        console.log(form)
        setError("")
        setLoading(true)
        try {
            const res = await fetch("https://api-funval-g6.onrender.com/auth/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.detail || "credenciales incorrectas")
                console.log(error)
                return
            }


            console.log(data)
            localStorage.setItem("token", data.access_token)
            localStorage.setItem("username", data.user_name)
            localStorage.setItem("user_rol", data.user_role)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='h-screen flex items-center justify-center'>
            <form className="max-w-sm mx-auto border-2 border-blue-800 p-4">
                {error && <h2 className='text-red-700 font-bold'>credenciales incorrectas</h2>}
                <div className="mb-5">
                    <label htmlFor="email-alternative" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
                    <input name="email" onChange={handleChange} type="email" id="email-alternative" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password-alternative" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
                    <input name="password" onChange={handleChange} type="password" id="password-alternative" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="••••••••" required />
                </div>

                <button onClick={handleSubmit} type="submit" className="text-white p-2 rounded-2xl bg-green-900 box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Submit</button>
            </form>
        </div>
    )
}
