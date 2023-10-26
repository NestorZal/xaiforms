const Tabs = (props) => {
  const { tabLabels, activeTab, setCurrentTab } = props;

  return (
    <nav>
      <ul className="tab-list">
        {tabLabels.map((tab, index) => {
          const uniqueKey = `${tab.split(" ").join("-")}-${index}`;

          return (
            <li
              key={uniqueKey}
              className={`tab-item ${activeTab === tab ? "active" : ""}`}
            >
              <button
                type="button"
                onClick={() => {
                  setCurrentTab(tab);
                }}
              >
                {tab}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Tabs;
