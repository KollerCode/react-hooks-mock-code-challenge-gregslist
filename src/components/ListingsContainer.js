import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import NewListingForm from "./NewListingForm";

function ListingsContainer({ search }) {
  const [listings, setListings] = useState([]);
  const [sortBy, setSortBy] = useState("id")

  function handleDeleteListings(id) {
    const updatedListingArray = listings.filter(
      listing => listing.id !== id
    );
    setListings(updatedListingArray)
  }

  function handleAddListing(newListing) {
    const updatedListingArray = [newListing, ...listings]
    setListings(updatedListingArray)
  }

  const filteredListings = listings.filter(listing => {
    return listing.description.toLowerCase().includes(search.toLowerCase())
  })

  const sortedListings = filteredListings.sort((listingA, listingB) => {
    if (sortBy === "id") {
      return listingA.id - listingB.id
    } else {
      return listingA.location.localeCompare(listingB.location)
    }
  })

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((response) => response.json())
      .then((listings) => setListings(listings));
  }, []);

  const listingCards = sortedListings.map((listingObj) => {
    return <ListingCard
      key={listingObj.id}
      listing={listingObj}
      onDeleteListing={handleDeleteListings} />;
  });

  return (
    <main>
      <ul className="cards">{listingCards}</ul>
      <NewListingForm onAddListing={handleAddListing}/>
      <button onClick={() => setSortBy("id")}>Sort by Default</button>
      <button onClick={() => setSortBy("location")}>Sort by Location</button>
    </main>
  );
}

export default ListingsContainer;
