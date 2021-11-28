import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  // prepare wrapper
  let wrapper;
  let input;
  let button;
  beforeEach(() => {
    wrapper = shallow(
      <App />
    );
  })
  // assertions wil go there
  it('it should have `th` "Items"', () => {
    expect(
      wrapper.contains(<th>Items</th>)
    ).toBe(true);
    input = wrapper.find('button').first();
    button = wrapper.find('button').first();
  });

  it('should shave a `button` element', () => {
    expect(
      wrapper.containsMatchingElement(
        <button disabled={true}>Add item</button>
      )
    ).toBe(true);
  })

  it('it should have a `input` element', () => {
    expect(
      wrapper.containsMatchingElement(
        <input />
      )
    ).toBe(true);
  })

  it('`button` should be disabled', () => {
    
    expect(
      button.props().disabled
    ).toBe(true);
  })

  describe('the user populates the input', () => {
    const item = 'Vancouver';
    let input;
    let button;
    beforeEach(() => {
      input = wrapper.find('input').first();
      input.simulate('change', {
        target: {value: item}
      });
      button = wrapper.find('button').first();
    });

    it('should udpate the state property `item`', () => {
      expect(
        wrapper.state().item
      ).toEqual(item);
    });

    it('should enable `button`', () => {
      expect(
        button.props().disabled
      ).toBe(false);
    });

    describe('and then clears the input', () => {
      let button;
      beforeEach(() => {
        const input = wrapper.find('input').first();
        input.simulate('change', {
          target: {value: ''}
        });
        button = wrapper.find('button').first();
      });

      it('should disable `button`', () => {
        expect(
          button.props().disabled
        ).toBe(true);
      });
    });

    describe('and then submits the form', () => {
      let input;
      let button;

      beforeEach(() => {
        const form = wrapper.find('form').first();
        form.simulate('submit', {
          preventDefault: () => {}
        });
        input = wrapper.find('input').first();
        button = wrapper.find('button').first();
      });

      it('should add the item to state', () => {
        expect(
          wrapper.state().items
        ).toContain(item);
      });

      it('should render the item in the table', () => {
        expect(
          wrapper.containsMatchingElement(
            <td>{item}</td>
          )
        ).toBe(true);
      });

      it('should clear the input field', () => {
        
        expect(
          input.props().value
        ).toEqual('');
      });

      it('should disalbe button', () => {
        
        expect(
          button.props().disabled
        ).toBe(true);
      });

    });

  });
  // the rest of our assertions will go there
})