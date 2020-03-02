import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
import DataItem from "./item";

const App = () => {
    const API_URL = 'http://localhost:5000/api'
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [timezone, setTimezone] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [country, setCountry] = useState('')

    const getData = async () => {
        setLoading(true)
        setError(false)
        await axios.get(API_URL)
            .then(payload => {
                setData(payload)
                setLoading(false)
            })
            .catch(err => {
                setError(true)
            })
    }

    const addNewItem = (item) => {
        setError(false)
        axios.post(API_URL, item)
            .then(payload => {
            })
            .catch(error => {
                setError(true)
            })
    }
    useEffect(() => {
        getData()
    }, [])

    const handleGetData = () => {
        getData()
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const item = {
            gps: [
                +latitude,
                +longitude
            ],
            country,
            timezone
        }
        addNewItem(item)

    }

    if (error) return <h1>Упс ОШИБКА, давайте попробуем снова</h1>
    if (loading) return <h1>Загружаю</h1>

    const items = data === null ?
        null :
        data.data.map(({gps, country, timezone, _id}) => {
            return <DataItem key={_id} gps={gps} country={country} timezone={timezone}/>
        })
    return (
        <div className="App">
            {console.log(data)}
            <form onSubmit={(e) => handleSubmit(e)}>
                <input value={timezone} onChange={(e) => setTimezone(e.target.value)} placeholder={"Введите timezone"}/>
                <input value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder={"Введите широту"}/>
                <input value={longitude} onChange={(e) => setLongitude(e.target.value)}
                       placeholder={"Введите долготу"}/>
                <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder={"Введите долготу"}/>
                <button>Создать</button>
            </form>
            <button onClick={handleGetData}>Загрузить снова данные</button>
            {items}
        </div>
    );
}

export default App;
