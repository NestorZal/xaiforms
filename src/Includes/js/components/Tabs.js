import Button from "../form/fields/Button";

let tabLabels;
export const setTabLabels = (tabs) => {
  tabLabels = tabs;
};

const Tabs = (props) => {
  const { activeTab, setCurrentTab } = props;

  return (
    <ol className="tab-list">
      {tabLabels.map((tab, index) => {
        const uniqueKey = `${tab.split(" ").join("-")}-${index}`;

        return (
          <li
            key={uniqueKey}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
          >
            <Button
              type="button"
              onClick={() => {
                setCurrentTab(tab);
              }}
            >
              {tab}
            </Button>
          </li>
        );
      })}
    </ol>
  );
};

export default Tabs;
