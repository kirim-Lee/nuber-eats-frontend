import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Pagination, usePagination } from '../pagination';

const onPrev = jest.fn();
const onNext = jest.fn();

const TestComponent = () => {
  const pagination = usePagination(2);

  return (
    <div>
      <span>{pagination.page}</span>
      <button onClick={pagination.onPrevPage}>prev</button>
      <button onClick={pagination.onNextPage}>next</button>
    </div>
  );
};

describe('<Pagination />', () => {
  it('should render ok with props', async () => {
    const { getByText, container } = render(
      <Pagination
        page={1}
        totalPages={10}
        onPrevPageClick={onPrev}
        onNextPageClick={onNext}
      />
    );

    getByText('page 1 of 10');
    expect(container.firstChild?.firstChild).toBeEmptyDOMElement();
    expect(container.firstChild?.lastChild).not.toBeEmptyDOMElement();
  });

  it('should not display next page button', async () => {
    const { getByText, container, baseElement } = render(
      <Pagination
        page={10}
        totalPages={10}
        onPrevPageClick={onPrev}
        onNextPageClick={onNext}
      />
    );

    getByText('page 10 of 10');
    expect(container.firstChild?.firstChild).not.toBeEmptyDOMElement();
    expect(container.firstChild?.lastChild).toBeEmptyDOMElement();

    baseElement.querySelector('button')?.click();
    expect(onPrev).toBeCalled();
  });
});

describe('usePagination', () => {
  it('use Pagination', () => {
    const { getByText, container } = render(<TestComponent />);

    expect(container.firstChild?.firstChild).toHaveTextContent('2');

    fireEvent(
      getByText('prev'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    getByText('1');

    fireEvent(
      getByText('next'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      })
    );

    getByText('2');
  });
});
