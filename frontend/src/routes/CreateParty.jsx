import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import partyFetch from "../axios/config"

const CreateParty = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const loadServices = async () => {
            const res = await partyFetch.get("/services");
            setServices(res.data);
        };
        loadServices();
    }, [])

    return (
        <div className="form-page">
            <h2>Create your next party</h2>
            <p>Define your budget and choose between services</p>
            <form>
                <label>
                    <span>Party name:</span>
                    <input
                        type="text"
                        placeholder="Think outside the box"
                        required
                    />
                </label>
                <label>
                    <span>Author:</span>
                    <input
                        type="text"
                        placeholder="Party's owner"
                        required
                    />
                </label>
                <label>
                    <span>Description:</span>
                    <textarea
                        placeholder="Party's description"
                        required
                    ></textarea>
                </label>
                <label>
                    <span>Budget:</span>
                    <input
                        type="number"
                        placeholder="Party's budget"
                        required
                    />
                </label>
                <label>
                    <span>Image:</span>
                    <input
                        type="image"
                        placeholder="Party's image"
                        required
                    />
                </label>
                <div>
                    <h2>Choose between this services</h2>
                    <div className="services-container">
                        { services.length === 0 && <p>Loading...</p>}
                        { services.length > 0 && services.map((service) => (
                            <div key={service._id} className="service">
                                <img src={service.image} alt={service.name} />
                                <p className="service-name">{service.name}</p>
                                <p className="service-price">R${service.price}</p>
                                <div className="checkbox-container">
                                    <input type="checkbox" value={service._id} />
                                    <p>Check to buy service</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <input type="submit" value="Submit" className="btn"/>
            </form>
        </div>
    )
}

export default CreateParty