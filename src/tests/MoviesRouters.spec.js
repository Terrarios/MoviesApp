
import {MemoryRouter} from 'react-router-dom';
import {MoviesRouters} from '../routes/MoviesRouters';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';

jest.mock('../store/action', () => ({
  getMovieListByType: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let initState = {
  data: [],
  sortBy: ["rank", true],
  isAscending: [0]
}

let store = mockStore(initState)
store.dispatch = jest.fn();

describe('MoviesRouters', () => {
  test('Should render', () => {

    const wrapper = shallow(
     <Provider store={store}>
        <MemoryRouter>
          <MoviesRouters/>
        </MemoryRouter>
     </Provider>
   
    );

    expect(wrapper).toMatchSnapshot();
    //expect( wrapper.contains("Mentos' Movies")).toBe(true);

  });
})

