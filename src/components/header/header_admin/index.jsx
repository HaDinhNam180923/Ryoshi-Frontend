import React, {useState, useEffect} from "react";
import Logo from "../../../assets/images/image.png";
import "./index.css";
import AvatarDropdown from "../../avatar-drop-down";
import { useLocation, useNavigate } from "react-router-dom";
import NavLinkAdmin from "../../navLinkAdmin";

export default function AdminHeader() {
    const token = sessionStorage.getItem("authToken");
    const navigate = useNavigate();
    const location = useLocation();
    const [locationsName, setLocationsName] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);

    // Lấy ra danh sách tên địa điểm
    const fetchLocationsName = async () => {
        try {
            const response = await fetch("http://localhost:8000/api/v1/locations", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch locations");
            }

            const data = await response.json();
            return data.location;
        } catch (error) {
            console.error("Error fetching locations:", error);
            throw error; // Re-throw the error for further handling
        }
    };

    const initiateFetch = async () => {
        try {
            const locations = await fetchLocationsName(); // Chờ cho dữ liệu được lấy
            setLocationsName(locations); // Cập nhật danh sách địa điểm
        } catch (error) {
            console.error("Error during fetching process:", error);
        }
    };

    useEffect(() => {
        // Initiate the process
        initiateFetch();
    }, []); // Empty dependency array to run only on mount

    const handleChange = (event) => {
        const userInput = event.target.value;
        setSearch(userInput);
    
        // Lọc các địa điểm dựa trên đầu vào của người dùng
        const filtered = locationsName.filter(location =>
            location.name.toLowerCase().includes(userInput.toLowerCase())
        );
        setFilteredLocations(filtered);
    };
    
    const handleSelect = (location) => {
        setSearch('');
        setFilteredLocations([]); // Xóa gợi ý sau khi chọn
        const selectedLocations = [location]; 
        console.log(location)
        //Truyền 1 địa điểm được chọn
        navigate(`/admin/admin-edit-place/${location.location_id}`); // Truyền dữ liệu qua state
    };

    const handleEnter = () => {
        setSearch('');
        setFilteredLocations([]); // Xóa gợi ý sau khi chọn
        console.log(filteredLocations)
        //Truyền danh sách địa điểm phù hợp với keyword
        navigate('/admin/search-result', { state: { locations: filteredLocations } }); // Truyền dữ liệu qua state
    };

    return (
        <div id="header" className="header">
            <div className="container-fluid d-flex align-items-center">
                {/* <!-- Logo --> */}
                <img src={Logo} alt="Logo" className="logo blend-effect" />

                {/* <!-- Menu --> */}
                <div className="ad-menu d-flex align-items-center">
                    <NavLinkAdmin />
                </div>

                {/* <!-- Search --> */}
                <div className="search-container">
                    <input
                        type="text"
                        className="search-bar form-control"
                        value={search}
                        onChange={handleChange}
                        placeholder="旅行で検索する"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleEnter();
                            }
                        }}
                    />
                    {filteredLocations.length > 0 && (
                        <ul className="search-content">
                            <li className="search-title">観光地</li>
                        {filteredLocations.map((location, index) => (
                            <li
                            key={index}
                            onClick={() => handleSelect(location)}
                            className="search-li"
                            >
                                <img className="search-img" src={`http://localhost:8000/uploads/${location.images.split(",")[0].trim()}`}/>
                                {location.name}
                            </li>
                        ))}
                        </ul>
                    )}
                    <span onClick={handleEnter} className="icon-search">🔍</span>
                </div>  

                {/* <!-- User Section --> */}
                <div className="ad-user-section d-flex align-items-center">
                    <AvatarDropdown />
                </div>
            </div>
        </div>
    );
}