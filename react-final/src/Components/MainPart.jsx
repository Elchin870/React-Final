import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "../css/MainPart.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./Pagination";
import CoinDetails from "./CoinDetails";

function MainPart() {
  const [coins, setCoins] = useState([]);
  const [searchCoins, setSearchCoins] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const coinsPerPage = 10;

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchCoins(searchValue);
    const filterCoin = coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCoins(filterCoin);
    setCurrentPage(1);
  };

  const getAllCoins = async () => {
    try {
      const response = await axios.get("https://api.coinlore.net/api/tickers/");
      setCoins(response.data.data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getAllCoins();
  }, []);

  useEffect(() => {
    setFilteredCoins(coins);
  }, [coins]);

  const lastCoin = currentPage * coinsPerPage;
  const firstCoin = lastCoin - coinsPerPage;
  const currentCoins = filteredCoins.slice(firstCoin, lastCoin);
  const totalPages = Math.ceil(filteredCoins.length / coinsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleMoreInfo = (coin) => {
    setSelectedCoin(coin);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCoin(null);
  };

  return (
    <div className="mainPart">
      <h1>My Organization</h1>

      <div className="input-group">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={handleSearch}
        />
      </div>

      <div className="coinTable">
        <div className="coinTableHeader">
          <div>Rank</div>
          <div>Symbol</div>
          <div>Name</div>
          <div>Name ID</div>
          <div>Price (USD)</div>
          <div>More Information</div>
        </div>
        {currentCoins.length === 0 ? (
          <div>No coin found</div>
        ) : (
          currentCoins.map((coin) => (
            <div key={coin.id} className="coinRow">
              <div>{coin.rank}</div>
              <div>{coin.symbol}</div>
              <div>{coin.name}</div>
              <div>{coin.nameid}</div>
              <div>{coin.price_usd}</div>
              <div>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => handleMoreInfo(coin)}
                >
                  More Info
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {selectedCoin && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedCoin.name} Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CoinDetails coin={selectedCoin} />
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default MainPart;
