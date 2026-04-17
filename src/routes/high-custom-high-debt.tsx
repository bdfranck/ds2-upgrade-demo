import {
	GoabButton,
	GoabContainer,
	GoabFormItem,
	GoabInput,
} from '@abgov/react-components';

import './high-custom-high-debt.css';

const reminders = [
	{
		title: 'Generated file: Wage Obliged',
		due: 'Due: Oct 15, 2025',
		worker: 'Worker: Central 1 WSPSC caseload',
		creator: 'Creator: Candace Berry, CEC',
		overdue: true,
	},
	{
		title: 'Generated file: History Guideline',
		due: 'Due: Oct 15, 2025',
		worker: 'Worker: Central 1 WSPSC caseload',
		creator: 'Creator: Candace Berry, CEC',
		overdue: true,
	},
	{
		title: 'Due: Apply Assured Income Severely Handicapped (AISH)',
		due: 'Due: Oct 19, 2025',
		worker: 'Worker: Crystal L.M., Admin',
		creator: 'Creator: Candace Berry, CEC',
		overdue: false,
	},
	{
		title: 'Due: Apply Financial Plan',
		due: 'Due: Oct 19, 2025',
		worker: 'Worker: Crystal L.M., Admin',
		creator: 'Creator: Candace Berry, CEC',
		overdue: false,
	},
	{
		title: 'Due: Across Medical Supports',
		due: 'Due: Oct 23, 2025',
		worker: 'Worker: Crystal L.M., Admin',
		creator: 'Creator: Polly Harrison, CEC',
		overdue: false,
	},
];

export function HighCustomHighDebtRoute() {
	return (
		<main className="reminders-page">
			<aside className="reminders-nav" aria-label="Case navigation">
				<a href="#" className="reminders-nav-link">Action plan</a>
				<a href="#" className="reminders-nav-link">Intake assessment</a>
				<a href="#" className="reminders-nav-link">Personal information</a>
				<a href="#" className="reminders-nav-link">Income & assets</a>
				<a href="#" className="reminders-nav-link">Employment</a>
				<a href="#" className="reminders-nav-link">Education</a>
				<a href="#" className="reminders-nav-link">Comments</a>
				<a href="#" className="reminders-nav-link is-active">Reminders</a>
				<a href="#" className="reminders-nav-link">History</a>
			</aside>

			<section className="reminders-content">
				<header className="reminders-header">
					<a href="#" className="back-link">Back to my work page</a>
					<h1>Aleen Nadean Brynne</h1>
					<p className="subhead">Assigned to Fat Smith | Case status: Active</p>
				</header>

				<div className="toolbar-row">
					<div className="toolbar-filter">Select reminders</div>
					<div className="toolbar-actions">
						<GoabButton type="secondary">Show completed</GoabButton>
						<label className="toolbar-check">
							<input type="checkbox" checked readOnly />
							Clear reminders
						</label>
						<label className="toolbar-check">
							<input type="checkbox" readOnly />
							Action plan items
						</label>
					</div>
				</div>

				<section className="reminders-panels">
					<GoabContainer heading="Overdue reminders">
						<div className="reminder-list">
							{reminders.map((reminder) => (
								<article
									key={reminder.title}
									className={`reminder-card ${reminder.overdue ? 'is-overdue' : 'is-upcoming'}`}
								>
									<p className="reminder-title">{reminder.title}</p>
									<p>{reminder.due}</p>
									<p>{reminder.worker}</p>
									<p>{reminder.creator}</p>
								</article>
							))}
						</div>
					</GoabContainer>

					<GoabContainer heading="New reminder">
						<div className="new-reminder-form">
							<GoabFormItem label="Title">
								<GoabInput width="100%" name="title" value="" />
							</GoabFormItem>

							<GoabFormItem label="Due">
								<GoabInput width="100%" name="due" value="Apr 12, 2018" />
							</GoabFormItem>

							<div className="worker-table-header" role="presentation">
								<span>Worker</span>
								<span>Role</span>
								<span>Location</span>
							</div>
							<div className="worker-table-row" role="presentation">
								<span>Fat Smith</span>
								<span>CEC</span>
								<span>Edmonton</span>
							</div>

							<div className="save-row">
								<GoabButton type="primary">Save</GoabButton>
							</div>
						</div>
					</GoabContainer>
				</section>
			</section>
		</main>
	);
}
