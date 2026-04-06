import React, { useEffect, useState, useRef } from "react";

import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { request } from "@/request";
import { useCrudContext } from "@/context/crud";
import { selectSearchedItems } from "@/redux/crud/selectors";

import { Empty } from "antd";

export default function SearchItem({ config }) {
  let { entity, searchConfig } = config;

  const {
    displayLabels,
    searchFields,
    outputValue = "_id",
    placeholder = "请输入关键词搜索",
  } = searchConfig;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);

  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, readBox } = crudContextAction;

  let source = request.source();
  const { result, isLoading, isSuccess } = useSelector(selectSearchedItems);

  const isTyping = useRef(false);
  const delayTimer = useRef(null);

  useEffect(() => {
    if (isLoading) {
      setOptions([{ label: "搜索中...", value: "__loading" }]);
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      if (delayTimer.current) {
        clearTimeout(delayTimer.current);
      }
    };
  }, []);

  const onSearch = (searchText) => {
    isTyping.current = true;

    if (delayTimer.current) {
      clearTimeout(delayTimer.current);
    }
    delayTimer.current = setTimeout(function () {
      if (isTyping.current && searchText !== "") {
        dispatch(
          crud.search(entity, source, {
            question: searchText,
            fields: searchFields,
          })
        );
      }
      isTyping.current = false;
    }, 500);
  };

  const onSelect = (data) => {
    const currentItem = result.find((item) => {
      return item[outputValue] === data;
    });

    dispatch(crud.currentItem(currentItem));
    panel.open();
    collapsedBox.open();
    readBox.open();
  };

  const onChange = (data) => {
    const currentItem = options.find((item) => {
      return item.value === data;
    });
    const currentValue = currentItem ? currentItem.label : data;
    setValue(currentValue);
  };

  useEffect(() => {
    let optionResults = [];

    (result || []).forEach((item) => {
      const labels = displayLabels.map((x) => item[x]).join(" ");
      optionResults.push({ label: labels, value: item[outputValue] });
    });

    setOptions(optionResults);
  }, [result]);

  return (
    <AutoComplete
      value={value}
      options={options}
      style={{
        width: "100%",
      }}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      notFoundContent={!isSuccess ? <Empty description="暂无匹配结果" /> : ""}
    >
      <Input placeholder={placeholder} suffix={<SearchOutlined />} />
    </AutoComplete>
  );
}
