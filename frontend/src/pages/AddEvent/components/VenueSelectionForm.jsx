import { MapPin, X, AlertCircle } from "lucide-react";

import "./VenueSelectionForm.css";

export default function VenueSelectionForm({
    rooms = [],

    unavailableRooms = [],

    selectedRoom,

    setSelectedRoom,
}) {
    const isRoomUnavailable = (roomId) => {
        return unavailableRooms.some((room) => room.id === roomId);
    };

    const handleRoomClick = (room) => {
        if (isRoomUnavailable(room.id)) {
            return;
        }

        setSelectedRoom(room);
    };

    const availableRoomCount = rooms.filter(
        (room) => !isRoomUnavailable(room.id),
    ).length;

    return (
        <>
            <div className="section-header">
                <div className="section-header-row">
                    <span className="section-pill">Step 3</span>

                    <span className="section-title">Venue Selection</span>
                </div>

                <p className="section-desc">Choose an available room for your event.</p>
            </div>

            <div className="room-header">
                <span
                    className="form-label"
                    style={{
                        marginBottom: 0,
                    }}
                >
                    Available Rooms
                </span>

                <span className="room-count">{availableRoomCount} rooms free</span>
            </div>

            {/* Empty State */}

            {rooms.length === 0 && (
                <div className="empty-room-state">
                    <AlertCircle size={18} />

                    <span>No rooms available</span>
                </div>
            )}

            {/* Room Grid */}

            <div className="room-grid">
                {rooms.map((room) => {
                    const unavailable = isRoomUnavailable(room.id);

                    return (
                        <button
                            key={room.id}
                            type="button"
                            className={`
                                room-pill
                                ${selectedRoom?.id === room.id ? "active" : ""}
                                ${unavailable ? "booked" : ""}
                            `}
                            onClick={() => handleRoomClick(room)}
                            disabled={unavailable}
                        >
                            <div className="room-pill-content">
                                <div className="room-name">{room.name}</div>

                                <div className="room-meta">
                                    {room.capacity
                                        ? `${room.capacity} seats`
                                        : "Capacity unavailable"}
                                </div>

                                {unavailable && <div className="room-status">Unavailable</div>}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Selected Room Card */}

            {selectedRoom && (
                <div className="selected-venue-card">
                    <div className="venue-col">
                        <div className="venue-label">Selected Venue</div>

                        <div className="venue-value crimson">
                            <MapPin size={16} />

                            {selectedRoom.name}
                        </div>
                    </div>

                    <div className="venue-col-divider" />

                    <div className="venue-col">
                        <div className="venue-label">Capacity</div>

                        <div className="venue-value">
                            {selectedRoom.capacity || "N/A"} seats
                        </div>
                    </div>

                    <button
                        type="button"
                        className="venue-close"
                        onClick={() => setSelectedRoom(null)}
                    >
                        <X size={16} />
                    </button>
                </div>
            )}
        </>
    );
}
