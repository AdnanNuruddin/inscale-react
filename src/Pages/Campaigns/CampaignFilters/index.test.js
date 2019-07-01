import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CampaignFilters from './';

configure({ adapter: new Adapter() });

describe('CampaignFilters', () => {
	it('Renders campaign search filter', () => {
		const campaignFilters = shallow(<CampaignFilters filters={{}} handleFilterChange={{}} />);
		expect(campaignFilters.find('input').length).toEqual(1);
	});

	it('Renders campaign date filters', () => {
		const campaignFilters = shallow(<CampaignFilters filters={{}} handleFilterChange={{}} />);
		expect(campaignFilters.find('DatePicker').length).toEqual(2);
	});
});