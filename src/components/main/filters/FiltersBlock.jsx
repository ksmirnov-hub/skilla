import React, {useEffect, useState, forwardRef}  from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputMask from "react-input-mask";
import moment from 'moment';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";

import CalendarIcon from 'images/calendarIcon';
import {
  resetType,
  setPeriodStart,
  setPeriodEnd,
  setType } from 'store';
import '@qpokychuk/sf-pro-display/index.css';
import '@qpokychuk/sf-pro-display/normal.css';
import './FiltersBlock.scss';

import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ChevronUpIcon,
  CloseIcon
} from '@chakra-ui/icons';
import {
	Menu,
	MenuButton,
	Portal,
	MenuList,
	MenuItem,
  Button
  } from '@chakra-ui/react';

  const callType = {
    "Все типы": '',
    "Входящие": 1,
    "Исходящие": 0
  }
  const selectionTypes = {
    0: "3 дня",
    1: "Неделя",
    2: "Месяц",
    3: "Год",
    4: "Указать даты"
  }

function FiltersBlock() {
  const dispatch = useDispatch();
  const [currentType, setCurrentType] = useState('Все типы');
  const [currentSelectionType, setCurrentSelectionType] = useState(0);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endDateInput, setEndDateInput] = useState('');
  const [startDateInput, setStartDateInput] = useState('');

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let start = '';
    let end = moment().format('YYYY-MM-DD');

    switch(currentSelectionType) {
      case 0:
        start = moment().subtract(3, 'day').format('YYYY-MM-DD');
        break;
      case 1:
        start = moment().subtract(7, 'day').format('YYYY-MM-DD');
        break;
      case 2:
        start = moment().subtract(31, 'day').format('YYYY-MM-DD');
        break;
      case 3:
        start = moment().subtract(366, 'day').format('YYYY-MM-DD');
        break;
      case 4:
        start = moment().subtract(366, 'day').format('YYYY-MM-DD');
        break;
      default:
       start =  null;
       end =  moment(endDate).format('YYYY-MM-DD');
       break
    }
    if (start) {
      dispatch(setPeriodStart(start));
      dispatch(setPeriodEnd(end));
    }
  
  }, [currentSelectionType])

  const clearCalendar = () => {
    setEndDateInput('');
    setStartDateInput('');
  }

  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  
  const handleCurrentType = (type) => {
    dispatch(setType(callType[type]))
    setCurrentType(type)
  }

  const handleCurrentSelectionType = (period) => {
    clearCalendar()
    setCurrentSelectionType(period)
  }

  const listBack = () => {
    const newType = currentSelectionType === 0 ? 4 : currentSelectionType - 1;
    setCurrentSelectionType(newType);
    clearCalendar();
  }

  const listForward = () => {
    const newType = currentSelectionType === 4 ? 0 : currentSelectionType + 1;
    setCurrentSelectionType(newType);
    clearCalendar();
  }
  

  return (
    <div className="filters">
        <div>
            <Menu>
            {({ isOpen }) => (
              <>
                <MenuButton as={Button} rightIcon={isOpen ? <ChevronUpIcon className='up'/> : <ChevronDownIcon />}>
                  <div className='button'>{currentType}</div>
                </MenuButton>
                <Portal>
                    <MenuList>
                        <MenuItem
                          className={currentType === "Все типы" ? 'selected' : ''}
                          onClick={() => handleCurrentType("Все типы")}
                        >
                          Все типы
                        </MenuItem>
                        <MenuItem
                          className={currentType === "Входящие" ? 'selected' : ''}
                          onClick={() => handleCurrentType("Входящие")}
                        >
                          Входящие
                        </MenuItem>
                        <MenuItem
                          className={currentType === "Исходящие" ? 'selected' : ''} 
                          onClick={() => handleCurrentType("Исходящие")}
                        >
                            Исходящие
                        </MenuItem>
                    </MenuList>
                </Portal>
              </>
            )}
            </Menu>
            {
              (currentType !== "Все типы" || currentSelectionType !== 0) && (
                <Button
                  className='reset'
                  rightIcon={<CloseIcon boxSize={6} w={2} h={2} />}
                  onClick={() => {
                    setCurrentType("Все типы");
                    dispatch(setType(''))
                    setCurrentSelectionType(0)
                  }}
                >
                    Сбросить фильтры
                </Button>
              )
            }
        </div>
        <div>
        <Menu>
               
                <Button
                  className='reset'
                  size='xs'
                  w='20px'
                  onClick={listBack}
                >
                  <ChevronLeftIcon />
                </Button>
                <MenuButton
                    as={Button}
                    bg='white'
                    aria-label={CalendarIcon}
                >
                  <div className='selection'>
                    <CalendarIcon />
                    <div>{selectionTypes[currentSelectionType]}</div>
                  </div>
                </MenuButton>
                <Button
                  className='reset'
                  size='xs'
                  w='20px'
                  onClick={listForward}
                >
                  <ChevronRightIcon />
                </Button>
                <Portal>
                    <MenuList>
                        <MenuItem
                          onClick={() => handleCurrentSelectionType(0)}
                          className={currentSelectionType === 0 ? 'selected' : ''}
                        >
                          {selectionTypes[0]}
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleCurrentSelectionType(1)}
                          className={currentSelectionType === 1 ? 'selected' : ''}
                        >
                          {selectionTypes[1]}
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleCurrentSelectionType(2)}
                          className={currentSelectionType === 2 ? 'selected' : ''}
                        >
                          {selectionTypes[2]}
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleCurrentSelectionType(3)}
                          className={currentSelectionType === 3 ? 'selected' : ''}
                        >
                          {selectionTypes[3]}
                        </MenuItem>
                        <div className='date-select'>
                          <div className={currentSelectionType === 4 ? 'title selected' : 'title'}>Указать даты</div>
                          <div>
                            <div className='date-picker'>
                              <InputMask
                                mask="9999-99-99"
                                value={startDateInput}
                                onClick={() => handleCurrentSelectionType(4)}
                                onChange={(e) => {
                                  let start = new Date(moment(e.target.value)).toString()
                                  setStartDateInput(e.target.value)
                                  if (start !== 'Invalid Date') {
                                      dispatch(setPeriodStart(e.target.value));
                                      setStartDate(start)
                                  }
                                }}
                              >
                                {(props) => (<input {...props} className='custom-input' />)}
                              </InputMask>
                              <div>-</div>
                              <InputMask
                                mask="9999-99-99"
                                value={endDateInput}
                                onClick={() => handleCurrentSelectionType(4)}
                                onChange={(e) => {
                                  let end = new Date(moment(e.target.value)).toString();
                                  setEndDateInput(e.target.value)
                                  if (end !== 'Invalid Date') {
                                    dispatch(setPeriodEnd(e.target.value));
                                      setStartDate(end)
                                  }
                                }}
                                >
                                {(props) => (<input {...props} className='custom-input' />)}
                              </InputMask>
                            </div>
                            <div>
                              {!isOpen && (<button className="example-custom-input" onClick={handleClick}>
                                {<CalendarIcon />}
                              </button>)}
                              {isOpen && (
                                <DatePicker
                                  swapRange
                                  selected={startDate}
                                  startDate={startDate}
                                  endDate={endDate}
                                  onClick={() => handleCurrentSelectionType(4)}
                                  onChange={ ([newStartDate, newEndDate]) => {
                                    setIsOpen(!isOpen);
                                    setStartDate(newStartDate);
                                    setStartDateInput(moment(newStartDate).format('YYYY-MM-DD'))
                                    setEndDate(newEndDate);
                                    setEndDateInput(moment(newEndDate).format('YYYY-MM-DD'))
                                    dispatch(setPeriodStart(moment(newStartDate).format('YYYY-MM-DD')));
                                    dispatch(setPeriodEnd(moment(newEndDate).format('YYYY-MM-DD')));
                                  }}
                                  dateFormat="YYYY-mm-dd"
                                  selectsRange
                                  inline
                                />
                              )}
                            </div>
                          </div>
                        </div>
                    </MenuList>
                </Portal>
            </Menu>
        </div>
    </div>
  );
}

export default FiltersBlock;