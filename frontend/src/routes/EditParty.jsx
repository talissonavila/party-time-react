import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import UseToast from "../hooks/useToast";
import partyFetch from "../axios/config";

import "./Form.css";

const EditParty = () => {
    const {id} = useParams();
    const [party, setParty] = useState(null);
    const [services, setServices] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const loadServices = async () => {
            const res = await partyFetch.get('/services');
            setServices(res.data);
            loadParty();
        }

        const loadParty = async () => {
            const res = await partyFetch.get(`/parties/${id}`);
            setParty(res.data);
        }

        loadServices();
    }, [id]);

    const handleServices = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;

        const filteredService = services.filter((service) => service._id === value);

        let partyServices = party.services;

        if (checked) {
            partyServices = [...partyServices, filteredService[0]];
        } else {
            partyServices = partyServices.filter((service) => service._id !== value);
        }

        setParty({...party, services: partyServices});
    }

    const updateParty = async (e) => {
        e.preventDefault();
        try {
            const res = await partyFetch.put(`/parties/${party._id}`, party);
            if (res.status === 200) {
                navigate(`/party/${id}`);
                UseToast(res.data.msg);
            }
        } catch (error) {
            UseToast(error.response.data.msg, "error");
        }
    }

    if (!party) return <p>Loading...</p>

  return (
    <div className="form-page">
    <h2>Edit {party.title}</h2>
    <p>Adjust your party informations</p>
    <form onSubmit={(e) => updateParty(e)}>
        <label>
            <span>Party name:</span>
            <input
                type="text"
                placeholder="Think outside the box"
                required
                onChange={(e) => setParty({...party, title: e.target.value})}
                value={party.title}
            />
        </label>
        <label>
            <span>Author:</span>
            <input
                type="text"
                placeholder="Party's owner"
                required
                onChange={(e) => setParty({...party, author: e.target.value})}
                value={party.author}
            />
        </label>
        <label>
            <span>Description:</span>
            <textarea
                placeholder="Party's description"
                required
                onChange={(e) => setParty({...party, description: e.target.value})}
                value={party.description}
            ></textarea>
        </label>
        <label>
            <span>Budget:</span>
            <input
                type="number"
                placeholder="Party's budget"
                required
                onChange={(e) => setParty({...party, budget: e.target.value})}
                value={party.budget}
            />
        </label>
        <label>
            <span>Image:</span>
            <input
                type="text"
                placeholder="Party's image"
                required
                onChange={(e) => setParty({...party, image: e.target.value})}
                value={party.image}
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
                                checked={party.services.find((partyService) => partyService._id === service._id) || ""}
                            />
                            <p>Buy service</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <input type="submit" value="Update" className="btn" />
    </form>
</div>
  )
}

export default EditParty