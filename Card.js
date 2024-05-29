import React from 'react';

export default function Card({ item }) {
    let options = item.options;
    let priceOptions = Object.keys(options);

    return (
        <div>
            <div>
                <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                    <img src={item.imgSrc} className="card-img-top" alt="Food" style={{height:"120px",objectFit:"fill"}}/>

                    <div className="card-body">
                        <h5 className="card-title">{item.foodName}</h5>

                        <div className="container w-100">
                            <select className="m-2 h-100 bg-success">
                                {Array.from(Array(6),
                                    (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}> {i + 1} </option>
                                        )
                                    })}
                            </select>
                            <select className="m-2 h-100  bg-success rounded">
                                {
                                    priceOptions.map((data) => {
                                        return <option key={data} value={data}>{data} </option>
                                    })}
                            </select>
                            <div className='d-inline h-100'>
                                Total Price: ${item.price}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
