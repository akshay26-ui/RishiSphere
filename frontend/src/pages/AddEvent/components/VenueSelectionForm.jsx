import { MapPin, X, AlertCircle, CheckCircle, Users } from "lucide-react";
import "./VenueSelectionForm.css";

export default function VenueSelectionForm({ rooms = [], unavailableRooms = [], selectedRoom, setSelectedRoom, locked = false }) {

    function isBooked(roomId) {
        return unavailableRooms.some(r => r.id === roomId);
    }

    function pickRoom(room) {
        if (isBooked(room.id)) return;
        setSelectedRoom(room);
    }

    const freeCount = rooms.filter(r => !isBooked(r.id)).length;

    return (
        <>
            {/* step header */}
            <div className="section-header">
                <div className="section-header-row">
                    <span className="section-pill">Step 3</span>
                    <span className="section-title">Venue Selection</span>
                </div>
                <p className="section-desc">Choose an available room for your event.</p>
            </div>

            {/* locked — user hasn't picked date and time yet */}
            {locked ? (
                <div className="venue-locked">
                    <div className="venue-locked-icon">🔒</div>
                    <div className="venue-locked-title">Select date and time first</div>
                    <div className="venue-locked-desc">Fill in Step 2 above to see room availability for your chosen time slot.</div>
                </div>
            ) : (
                <>
                    {/* header row with counts */}
                    <div className="room-header">
                        <span className="form-label" style={{ marginBottom: 0 }}>Available Rooms</span>
                        <div className="room-counts">
                            <span className="room-count free">{freeCount} available</span>
                            {unavailableRooms.length > 0 && (
                                <span className="room-count booked-count">{unavailableRooms.length} booked</span>
                            )}
                        </div>
                    </div>

                    {/* legend */}
                    {rooms.length > 0 && (
                        <div className="room-legend">
                            <span className="legend-item"><span className="legend-dot green" />Available</span>
                            <span className="legend-item"><span className="legend-dot red" />Booked</span>
                            <span className="legend-item"><span className="legend-dot blue" />Selected</span>
                        </div>
                    )}

                    {/* empty state */}
                    {rooms.length === 0 && (
                        <div className="empty-room-state">
                            <AlertCircle size={18} />
                            <span>No rooms found. Try again or contact admin.</span>
                        </div>
                    )}

                    {/* room cards */}
                    <div className="room-cards-grid">
                        {rooms.map(room => {
                            const booked = isBooked(room.id);
                            const selected = selectedRoom?.id === room.id;

                            return (
                                <button
                                    key={room.id}
                                    type="button"
                                    className={`room-card ${selected ? "selected" : ""} ${booked ? "booked" : ""}`}
                                    onClick={() => pickRoom(room)}
                                    disabled={booked}
                                >
                                    {/* status badge */}
                                    <div className="room-card-badge">
                                        {selected
                                            ? <span className="badge selected-badge"><CheckCircle size={11} /> Selected</span>
                                            : booked
                                                ? <span className="badge booked-badge">Booked</span>
                                                : <span className="badge free-badge">Free</span>
                                        }
                                    </div>

                                    <div className="room-card-icon"><MapPin size={20} /></div>
                                    <div className="room-card-name">{room.name}</div>
                                    <div className="room-card-meta">
                                        <Users size={12} />
                                        <span>{room.capacity ? `${room.capacity} seats` : 'Capacity N/A'}</span>
                                    </div>

                                    {booked && <div className="room-card-booked-line" />}
                                </button>
                            );
                        })}
                    </div>

                    {/* selected room summary */}
                    {selectedRoom && (
                        <div className="selected-venue-card">
                            <div className="selected-venue-icon"><MapPin size={18} /></div>
                            <div className="selected-venue-info">
                                <div className="selected-venue-label">Selected Venue</div>
                                <div className="selected-venue-name">{selectedRoom.name}</div>
                                {selectedRoom.capacity && (
                                    <div className="selected-venue-cap">
                                        <Users size={12} /> {selectedRoom.capacity} seats capacity
                                    </div>
                                )}
                            </div>
                            <button type="button" className="venue-close" onClick={() => setSelectedRoom(null)}>
                                <X size={16} />
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}
