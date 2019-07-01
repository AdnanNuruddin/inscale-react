import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CampaignTable from './';

configure({ adapter: new Adapter() });

describe('CampaignTable', () => {
	it('Renders a campaign table', () => {
		const campaignTable = shallow(<CampaignTable campaigns={[]} />);
		expect(campaignTable.find('table').length).toEqual(1);
	});

	it('Shows empty message when no campaigns found', () => {
		const campaignTable = shallow(<CampaignTable campaigns={[]} />);
		expect(campaignTable.find('tbody td').text()).toEqual("No Campaign found");
	});

	let campaigns = [{ "id": 1, "name": "Divavu", "startDate": "9/19/2017", "endDate": "7/9/2019", "Budget": 88377 },
	{ "id": 2, "name": "Jaxspan", "startDate": "11/21/2017", "endDate": "8/21/2019", "Budget": 1608715 },
	{ "id": 3, "name": "Miboo", "startDate": "11/1/2017", "endDate": "6/20/2017", "Budget": 239 },
	{ "id": 4, "name": "Trilith", "startDate": "8/25/2017", "endDate": "11/30/2017", "Budget": 17943800000 }];

	it('Check if all rows are showing', () => {
		const campaignTable = shallow(<CampaignTable campaigns={campaigns} />);
		expect(campaignTable.find('tbody tr').length).toEqual(4);
	});

	it('Budget format working for thousand', () => {
		const campaignTable = shallow(<CampaignTable campaigns={campaigns} />);
		expect(campaignTable.find('tbody > tr').at(0).find('td').at(4).text()).toEqual("88.4K USD");
	});

	it('Budget format working for Million', () => {
		const campaignTable = shallow(<CampaignTable campaigns={campaigns} />);
		expect(campaignTable.find('tbody > tr').at(1).find('td').at(4).text()).toEqual("1.6M USD");
	});

	it('Budget format working for Billion', () => {
		const campaignTable = shallow(<CampaignTable campaigns={campaigns} />);
		expect(campaignTable.find('tbody > tr').at(3).find('td').at(4).text()).toEqual("17.9B USD");
	});

	it('Check if active status showing correctly', () => {
		const campaignTable = shallow(<CampaignTable campaigns={campaigns} />);
		expect(campaignTable.find('tbody > tr').at(0).find('td').at(3).html()).toEqual('<td><span class="Active"></span>Active</td>');
		expect(campaignTable.find('tbody > tr').at(3).find('td').at(3).html()).toEqual('<td><span class="Inactive"></span>Inactive</td>');
	});

})