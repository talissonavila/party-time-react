import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import partyFetch from "../axios/config"

import "./Home.css";

const Home = () => {
    const [parties, setParties] = useState(null);

    useEffect(() => {
        const loadParties = async () => {
            const res = await partyFetch.get("/parties");
            console.log(res);
            setParties(res.data);
        };
        loadParties();
    }, []);

    if (!parties) return <p>Loading parties...</p>

    return (
        <div className="home">
            <h1>Your parties</h1>
            <div className="parties-container">
                {parties.length === 0 && <p>There is not party created</p>}
                {parties.map((party) => (
                    <div key={party._id} className="party">
                        <img src={party.image} alt={party.title} />
                        <h3>{party.title}</h3>
                        <Link className="btn-secondary" to={`/party/${party._id}`}>More details</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home