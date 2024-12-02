import { render, screen } from '@testing-library/react';
import { act } from 'react';
import {Movie} from './Movie';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [
          { title: 'A New Hope' },
          { title: 'The Empire Strikes Back' },
          { title: 'Return of the Jedi' },
        ],
      }),
  })
);

describe('Movie Component', () => {
    beforeEach(() => {
      fetch.mockClear();
    });

    test('render movie component',async ()=>{
        act(() => {
            render(<Movie/>);
          });
        
        const linkElement = screen.getByText(/Welcome to Moview Review Portal/i);
        expect(linkElement).toBeInTheDocument();

        // Ensure the movies are fetched and displayed
    await waitFor(() => {
        expect(screen.getByText(/A New Hope/i)).toBeInTheDocument();
        expect(screen.getByText(/The Empire Strikes Back/i)).toBeInTheDocument();
      });
    })
});

