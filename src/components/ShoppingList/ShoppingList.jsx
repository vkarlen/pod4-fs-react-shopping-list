import './ShoppingList.css';

function ShoppingList() {
  return (
    <div className="shopping-list">
      <h2>Shopping List</h2>
      {/* Button Controls */}
      <div className="button-controls">
        <button
          className="list-button"
          value="resetButton"
          onClick={() => {
            console.log('Reset Button Clicked');
          }}
        >
          Reset
        </button>
        <button
          className="list-button"
          value="clearButton"
          onClick={() => {
            console.log('Clear Button Clicked');
          }}
        >
          Clear
        </button>
      </div>
      {/* List Items */}
      <div>
        <div className="list-item">
          <p>Apples</p>
          <p>5 lbs</p>
          <div className="item-buttons">
            <button className="item-button">Buy</button>
            <button className="item-button">Remove</button>
          </div>
        </div>

        <div className="list-item">
          <p>Chicken Breast</p>
          <p>20 lbs</p>
          <div className="item-buttons">
            <button className="item-button">Buy</button>
            <button className="item-button">Remove</button>
          </div>
        </div>

        <div className="list-item">
          <p>Orange Juice</p>
          <p>1 gallon</p>
          <div className="item-buttons">
            <button className="item-button">Buy</button>
            <button className="item-button">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingList;
