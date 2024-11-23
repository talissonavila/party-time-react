import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import partyFetch from "../axios/config"
import UseToast from "../hooks/useToast";

import "./Form.css";

const CreateParty = () => {
    const navigate = useNavigate();

    const [services, setServices] = useState([]);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState(0);
    const [image, setImage] = useState("");
    const [partyServices, setPartyServices] = useState([]);


    useEffect(() => {
        const loadServices = async () => {
            const res = await partyFetch.get("/services");
            setServices(res.data);
        };
        loadServices();
    }, []);

    const handleServices = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;

        const filteredService = services.filter((service) => service._id === value);

        if (checked) {
            setPartyServices((services) => [...services, filteredService[0]]);
        } else {
            setPartyServices((services) => services.filter((service) => service._id !== value));
        }

    }

    const createParty = async (e) => {
        e.preventDefault();

        try {
            const newParty = {
                title,
                author,
                description,
                budget,
                image,
                services: partyServices
            }

            const res = await partyFetch.post("/parties", newParty);
            if (res.status === 201) {
                navigate("/");
                UseToast(res.data.msg);
            }
        } catch (error) {
            UseToast(error.response.data.msg, "error");
        }




    }

    return (
        <div className="form-page">
            <h2>Create your next party</h2>
            <p>Define your budget and choose between services</p>
            <form onSubmit={(e) => createParty(e)}>
                <label>
                    <span>Party name:</span>
                    <input
                        type="text"
                        placeholder="Think outside the box"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                </label>
                <label>
                    <span>Author:</span>
                    <input
                        type="text"
                        placeholder="Party's owner"
                        required
                        onChange={(e) => setAuthor(e.target.value)}
                        value={author}
                    />
                </label>
                <label>
                    <span>Description:</span>
                    <textarea
                        placeholder="Party's description"
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    ></textarea>
                </label>
                <label>
                    <span>Budget:</span>
                    <input
                        type="number"
                        placeholder="Party's budget"
                        required
                        onChange={(e) => setBudget(e.target.value)}
                        value={budget}
                    />
                </label>
                <label>
                    <span>Image:</span>
                    <input
                        type="text"
                        placeholder="Party's image"
                        required
                        onChange={(e) => setImage(e.target.value)}
                        value={image}
                    />
                </label>
                <div>
                    <h2>Choose between this services</h2>
                    <div className="services-container">
                        {services.length === 0 && <p>Loading...</p>}
                        {services.length > 0 && services.map((service) => (
                            <div key={service._id} className="service">
                                <img src={service.image} alt={service.name} />
                                <p className="service-name">{service.name}</p>
                                <p className="service-price">R${service.price}</p>
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        value={service._id}
                                        onChange={(e) => handleServices(e)}
                                    />
                                    <p>Buy service</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <input type="submit" value="Submit" className="btn" />
            </form>
        </div>
    )
}

export default CreateParty