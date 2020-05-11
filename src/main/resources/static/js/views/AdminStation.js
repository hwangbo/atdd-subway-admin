import {ERROR_MESSAGE, EVENT_TYPE, KEY_TYPE} from "../../utils/constants.js";
import {listItemTemplate, subwayStationsTemplate} from "../../utils/templates.js";
import api from "../../api/index.js";

function AdminStation() {
  const $stationInput = document.querySelector("#station-name");
  const $stationAddButton = document.querySelector("#station-add-btn");
  const $stationList = document.querySelector("#station-list");

  const initDefaultSubwayStations = async () => {
    $stationList.innerHTML = '';
    const stations = await api.station.get();
    console.log(stations);
    stations.forEach(station => {
      $stationList.insertAdjacentHTML(
        "beforeend",
        subwayStationsTemplate(station)
      );
    });
  };

  const onAddStationHandler = async event => {
    if (event.key !== KEY_TYPE.ENTER && event.type !== 'click') {
      return;
    }
    if (event.type !== 'click') {
      event.preventDefault();
    }
    const $stationNameInput = document.querySelector("#station-name");
    const stationName = $stationNameInput.value;
    if (!stationName) {
      alert(ERROR_MESSAGE.NOT_EMPTY);
      return;
    }
    const newStation = {
      name: stationName
    };
    const saveStation = await api.station.create(newStation);
    $stationNameInput.value = "";
    $stationList.insertAdjacentHTML("beforeend", listItemTemplate(saveStation));
  };

  const onRemoveStationHandler = event => {
    const $target = event.target;
    const isDeleteButton = $target.classList.contains("mdi-delete");
    if (isDeleteButton) {
      $target.closest(".list-item").remove();
    }
  };

  const initEventListeners = () => {
    $stationInput.addEventListener(EVENT_TYPE.KEY_PRESS, onAddStationHandler);
    $stationAddButton.addEventListener(EVENT_TYPE.CLICK, onAddStationHandler);
    $stationList.addEventListener(EVENT_TYPE.CLICK, onRemoveStationHandler);
  };

  const init = () => {
    initDefaultSubwayStations();
    initEventListeners();
  };

  return {
    init
  };
}

const adminStation = new AdminStation();
adminStation.init();
