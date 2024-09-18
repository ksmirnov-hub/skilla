import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import './ListBlock.scss';
import AudioBlock from 'components/audio/Audio';
import IncomingCallIcon from 'images/incomingCallIcon';
import OutcomingCallIcon from 'images/outcomingCallIcon';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Avatar
} from '@chakra-ui/react'
import {
	useFetchCallsQuery,
} from 'store';
import { useState } from 'react';

function List() {
  const [isAsc, setIsAsc] = useState(true)
  const [sort, setSort] = useState('')
  const type = useSelector((state) => state.filter.type);
  const periodEnd = useSelector((state) => state.filter.periodEnd);
  const periodStart = useSelector((state) => state.filter.periodStart);

  const { isLoading, isError, data = {}, refetch } = useFetchCallsQuery({
    type,
    periodEnd,
    periodStart,
    sort,
    order: isAsc ? 'ASC' : 'DESC'
  });
	const { results: list = []} = data;
  const [isPlyaing, setIsPlaying] = useState(true);

 useEffect(() => {
  refetch()
 }, [periodStart, periodEnd, sort, isAsc])

  const fillTable = () => {
    return list.map((item, index) => (
      <Tr key={index}>
        <Td>
          {
            item.in_out === 1 ? (
              <IncomingCallIcon />
            ) : (
              <OutcomingCallIcon />
            )
          }
        </Td>
        <Td>
          {moment(item.date).format('h:mm')}
        </Td>
        <Td>
          <Avatar src={item.person_avatar} />
        </Td>
        <Td>{item.from_number}</Td>
        <Td>{item?.source?.from_site}</Td>
        <Td>
          {
            item?.abuse?.message ? (
              <div className='bad'>Плохо</div>
            ) : (
              <div className='good'>Хорошо</div>
            )
          }
        </Td>
        <Td>
            {
              item.record ? (
                (isPlyaing === item.id) ? (
                  <AudioBlock
                    url={`https://api.skilla.ru/mango/getRecord?record=${item.record}&partnership_id=${item.partnership_id}`}
                    autoPlay
                    controls
                    index={index}
                    setIsPlaying={setIsPlaying}
                  />
                ) : (
                  
              <button
                  onClick={() => {
                      setIsPlaying(item.id)
                  }}
              >
                {moment.utc((item?.time)*1000).format('HH:mm:ss')}
              </button>
                  
                )
              ) : ('')
            }
        </Td>
      </Tr>
    ))
  }

  return (
    <div className="list">
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Тип звонка</Th>
              <Th>
                <button
                    onClick={() => {
                      setIsAsc(!isAsc)
                      setSort('date');
                    }}
                >
                  Время
                </button>
              </Th>
              <Th>Сотрудник</Th>
              <Th>Звонок</Th>
              <Th>Источник</Th>
              <Th>Оценка</Th>
              <Th>
                <button
                    onClick={() => {
                      setIsAsc(!isAsc)
                      setSort('duration');
                    }}
                >
                  Длительность
                </button>
                
              </Th>
            </Tr>
          </Thead>
          {
            isLoading ? (
              <Spinner size='xl' />
            ) : (
              <Tbody>
                {
                  fillTable()
                }
              </Tbody>
            )
          }
        </Table>
      </TableContainer>
    </div>
  );
}

export default List;