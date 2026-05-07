import { X } from 'lucide-react';

export default function VenueSelectionForm({ 
  activeBlock, setActiveBlock, 
  activeFloor, setActiveFloor, 
  selectedRoom, setSelectedRoom 
}) {
  const handleRoomClick = (room, isBooked) => {
    if (!isBooked) {
      setSelectedRoom(room);
    }
  };

  return (
    <>
      <div className="section-header">
        <div className="section-header-row">
          <span className="section-pill">Step 3</span>
          <span className="section-title">Venue Selection</span>
        </div>
        <p className="section-desc">Find an available space that fits your capacity.</p>
      </div>

      <div className="block-pills">
        <button 
          type="button" 
          className={`block-pill ${activeBlock === 'academic' ? 'active' : ''}`}
          onClick={() => setActiveBlock('academic')}
        >
          Academic Block
        </button>
        <button 
          type="button" 
          className={`block-pill ${activeBlock === 'campus' ? 'active' : ''}`}
          onClick={() => setActiveBlock('campus')}
        >
          Campus Center
        </button>
        <button 
          type="button" 
          className={`block-pill ${activeBlock === 'outdoor' ? 'active' : ''}`}
          onClick={() => setActiveBlock('outdoor')}
        >
          Outdoor
        </button>
      </div>

      <div className="floor-pills">
        <button 
          type="button" 
          className={`floor-pill ${activeFloor === 'ground' ? 'active' : ''}`}
          onClick={() => setActiveFloor('ground')}
        >
          Ground Floor
        </button>
        <button 
          type="button" 
          className={`floor-pill ${activeFloor === 'first' ? 'active' : ''}`}
          onClick={() => setActiveFloor('first')}
        >
          1st Floor
        </button>
        <button 
          type="button" 
          className={`floor-pill ${activeFloor === 'second' ? 'active' : ''}`}
          onClick={() => setActiveFloor('second')}
        >
          2nd Floor
        </button>
      </div>

      <div className="room-header">
        <span className="form-label" style={{ marginBottom: 0 }}>Available Rooms</span>
        <span className="room-count">4 rooms free</span>
      </div>

      <div className="room-grid">
        {['A-101', 'A-102'].map(room => (
          <button 
            key={room}
            type="button" 
            className={`room-pill ${selectedRoom === room ? 'active' : ''}`}
            onClick={() => handleRoomClick(room, false)}
          >
            {room}
          </button>
        ))}
        <button type="button" className="room-pill booked">A-103</button>
        {['A-104', 'Auditorium'].map(room => (
          <button 
            key={room}
            type="button" 
            className={`room-pill ${selectedRoom === room ? 'active' : ''}`}
            onClick={() => handleRoomClick(room, false)}
          >
            {room}
          </button>
        ))}
      </div>

      {selectedRoom && (
        <div className="selected-venue-card">
          <div className="venue-col">
            <div className="venue-label">Selected Venue</div>
            <div className="venue-value crimson">{selectedRoom}</div>
          </div>
          <div className="venue-col-divider" />
          <div className="venue-col">
            <div className="venue-label">Capacity</div>
            <div className="venue-value">60 seats</div>
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
