import './SelectOption.css';
import React, { useState } from 'react';

// JSON 데이터
const testData = {
  "_id": "621f2588d8d85b8d78eb3e64",
  "data": {
    "countList": [
      {
        "combination": ["스몰", "검정"],
        "remainCount": 0
      },
      {
        "combination": ["스몰", "하양"],
        "remainCount": 1
      },
      {
        "combination": ["스몰", "빨강"],
        "remainCount": 3
      },
      {
        "combination": ["라지", "검정"],
        "remainCount": 3
      }
    ],
    "titleList":["사이즈","색상"],
    "groupList": [
      {
        "title": "사이즈",
        "options": ["스몰", "라지"]
      },
      {
        "title": "색상",
        "options": ["검정", "하양", "빨강"]
      }
    ]
  }
};

const SelectOption = () => {
  const titleCount = testData.data.titleList.length;
  //속성 초기화
  const initialState = {};
  for (let i = 1; i <= titleCount; i++) {
    initialState[i] = '';
  }

  const [selectedOptions, setSelectedOptions] = useState(initialState);
  const handleChange = (event, title) => {
    setSelectedOptions({
      ...selectedOptions,
      [title]: event.target.value
    });
  };

  const getOptionText = (option, title) => {
    const titleName = testData.data.titleList;
    const otherTitle = title === titleName[0] ? titleName[1] : titleName[0];
    console.log(otherTitle)
    //othertitle -> 색상
    const selectedOtherOption = selectedOptions[otherTitle];
    const countList = testData.data.countList;
    if (selectedOtherOption) {
      const matchedItem = testData.data.countList.find(item => 
        item.combination.includes(option) && item.combination.includes(selectedOtherOption)
      );
      if (matchedItem) {
        return matchedItem.remainCount > 0 
          ? `${option} (${matchedItem.remainCount}개 구매가능)` 
          : `${option} (품절)`;
      }
    }
    else {
      return`${option}`
    }
  };


  return (
    <div className="App">
      react를 활용한 selection 구현
      <div className='aline'>
        {testData.data.groupList.map(data => (
          <select
            key={data.title}
            value={selectedOptions[data.title]}
            onChange={(e) => handleChange(e, data.title)}
          >
            <option value="">{data.title}</option>
            {data.options.map(option => (
              <option key={option} value={option}>
                {getOptionText(option, data.title)}
              </option>
            ))}
          </select>
        ))}
      </div>
      {selectedOptions.사이즈 && selectedOptions.색상 && (
        <p>{selectedOptions.사이즈} / {selectedOptions.색상}</p>
      )}
    </div>
  );
};

export default SelectOption;