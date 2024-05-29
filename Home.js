import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      response = await response.json();
      console.log('Fetched Data:', response); // Debugging output
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <Carousel />
      <div className='container'>
        {
          foodCat.length > 0
            ? foodCat.map((category) => (
              <div key={category._id} className='row mb-3'>
                <div className="fs-3 m-3">
                  {category.CategoryName}
                </div>
                <hr />
                {
                  foodItem.length > 0
                    ? foodItem
                        .filter((item) => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                        .map((filterItems) => (
                          <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                            <Card
                              foodName={filterItems.name}
                              options={filterItems.options[0]}
                              imgsrc={filterItems.img}
                            />
                          </div>
                        ))
                    : <div>No such data found</div>
                }
              </div>
            ))
            : <div>Loading...</div>
        }
      </div>
      <Footer />
    </div>
  )
}
