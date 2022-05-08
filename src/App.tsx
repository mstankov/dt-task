import { createContext, FC, useEffect, useState } from 'react';
import { Board, DataContext } from './features/board/board.feature';
import { getBoardDataAsync } from './features/board/board.model';
import { BoardData, Department, Employee } from './shared/types';
import './App.scss';
import { EntityStateReducer, useEntityReducer } from './entityAdapter/entityAdapter.utils';
import { normalizeDepartments, normalizeEmployees } from './data/data.utils';
import { LoadingIndicator } from './components/loadingIndicator/loadingIndicator';

export const EmployeeContext = createContext<EntityStateReducer<Employee> | null>(null);
export const DepartmentContext = createContext<EntityStateReducer<Department> | null>(null);

const App: FC = () => {
  const [data, setData] = useState<BoardData | null>(null);
  const employeeEntityReducer = useEntityReducer<Employee>([], 'EmployeeReducer');
  const departmentEntityReducer = useEntityReducer<Department>([], 'DepartmentReducer');

  useEffect(() => {
    const getData = async () => {
      const boardData = await getBoardDataAsync();
      setData(boardData);
    };

    getData();
  }, []);

  useEffect(() => {
    if (employeeEntityReducer && departmentEntityReducer && data) {
      const [, empDispatcher] = employeeEntityReducer;
      const [, depDispatcher] = departmentEntityReducer;

      empDispatcher('addMany', normalizeEmployees(data.organization.employees));
      depDispatcher('addMany', normalizeDepartments(data.organization.departments));
    }
  }, [data]);

  // Indicate board is loading if reducers are "in process of setting up"
  if (!data) return <LoadingIndicator />;

  return (
    <DataContext.Provider value={data}>
      <EmployeeContext.Provider value={employeeEntityReducer}>
        <DepartmentContext.Provider value={departmentEntityReducer}>
          <Board />
        </DepartmentContext.Provider>
      </EmployeeContext.Provider>
    </DataContext.Provider>
  );
};

export default App;
