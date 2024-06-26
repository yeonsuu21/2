import './SelectOption.css';
import React, { useState } from 'react';

// JSON 데이터 예시
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
        "remainCount": 0
      },
      {
        "combination": ["라지", "하양"],
        "remainCount": 0
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
  const titleList = testData.data.titleList;
  const titleCount = testData.data.titleList.length;

  // 속성 초기화
  const initialState = {};
  titleList.forEach(title => {
    initialState[title] = '';
  });

  const [selectedOptions, setSelectedOptions] = useState(initialState);
  const handleChange = (event, title) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [title]: event.target.value
    }));
  };

  const getOptionText = (option, title) => {
    if (title === titleList[0]) {
      // 첫 번째 옵션의 경우 (첫번째 옵션은 바로 품절이 나타나야함)
      const matchedItem = testData.data.countList.filter(item => item.combination[0] === option);
      const allOutOfStock = matchedItem.every(item => item.remainCount === 0);

      return allOutOfStock ? `${option} (품절)` : `${option}`;
    } else {
      // 첫 번째 옵션이 아닌 경우 (품절 or 갯수가 나타나야함)
      // 현재 선택된 옵션을 제외한 나머지(이미 첫번째는 선택됨 .. 등)
      const selectedOther = titleList.filter(t => t !== title).map(t => selectedOptions[t]);

      const matchedItem = testData.data.countList.find(item =>
        item.combination.includes(option) && selectedOther.every(opt => item.combination.includes(opt))
      );
        // matchedItem == true
      if (matchedItem) {
        return matchedItem.remainCount > 0 
          ? `${option} (${matchedItem.remainCount}개 구매가능)` 
          : `${option} (품절)`;
      }
      //combination 없는 배열은 공백으로 처리
      return '';
    }
  };

  return (
    <div className="App">
      react를 활용한 selection 구현
      <div className='aline'>
        {testData.data.groupList.map((data, index) => (
          <select
            key={data.title}
            value={selectedOptions[data.title]}
            onChange={(e) => handleChange(e, data.title)}
            disabled={index > 0 && !selectedOptions[titleList[index - 1]]}
          >
            <option value="">{data.title}</option>
            {data.options.map(select => (
              <option key={select} value={select}>
                {getOptionText(select, data.title)}
              </option>
            ))}
          </select>
        ))}
      </div>
      { ((selectedOptions[titleList[0]] && selectedOptions[titleList[1]] ) || selectedOptions[titleList[2]] )&& (
        <p>{selectedOptions[titleList[0]]} / {selectedOptions[titleList[1]]} / {selectedOptions[titleList[2]]}  </p>
      )}
    </div>
  );
};

export default SelectOption;