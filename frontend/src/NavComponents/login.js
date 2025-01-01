import './login.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:3003/login",{withCredentials:true})
            .then(response => {
                if (response.data.user) {
                    navigate('/'); // redirect if already logged in
                }
            })
            .catch(error => {
                console.error("There was an error making the request:", error);
            });
    }, [navigate]);

    async function formSubmit(e) {
        e.preventDefault();

        try {
            const result = await axios.post("http://localhost:3003/login", {
                loginname: name,
                pass: password
            }, {
                headers: { "Content-type": "application/json" },withCredentials:true
            });

            if (result.status === 200) {
                navigate("/");
            } else {
                setError('Name And Password Do not match');
                alert("Name And Password Do not match");
            }
        } catch (err) {
            console.error("Login failed:", err.response?.data?.error || err.message);
            alert("Login failed: " + (err.response?.data?.error || err.message));
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <h3 className="text-center mb-4">Login</h3>
                        <form onSubmit={formSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="name">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Login
                            </button>
                        </form>
                        <div className="text-center mt-3">
                            <a href="/signup" className="btn btn-link">New User? Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
