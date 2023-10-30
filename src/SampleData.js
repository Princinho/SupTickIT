
export const sampleData = {
    projects: [
        {
            id: 1, title: 'SupTickIT',
            description: 'IT support tickets management system',
            dateCreated: '2022-09-15T12:30:45.000Z', // Random date within the range
            createdBy: 1
        },
        {
            id: 2, title: 'VLC',
            description: 'Multi platform media player',
            dateCreated: '2021-05-03T08:15:30.000Z', // Random date within the range
            createdBy: 2
        },
        {
            id: 3, title: 'Google chrome',
            description: 'Powerful and efficient web browser with a large online community and constant support availability',
            dateCreated: '2019-11-20T16:45:10.000Z', // Random date within the range
            createdBy: 1
        },
        {
            id: 4, title: 'MS Office',
            description: 'Document processing software with a plethora of customization options and tools for collaborative work',
            dateCreated: '2018-02-28T21:10:50.000Z', // Random date within the range
            createdBy: 3
        },
        {
            id: 5, title: 'Adobe Photoshop',
            description: 'Professional photo editing software with advanced features and tools for graphic design and digital art',
            dateCreated: '2017-07-12T14:20:35.000Z', // Random date within the range
            createdBy: 2
        },
        {
            id: 6, title: 'Zoom',
            description: 'Video conferencing software with screen sharing and recording capabilities for remote meetings and webinars',
            dateCreated: '2020-10-05T10:05:25.000Z', // Random date within the range
            createdBy: 1
        },
        {
            id: 7, title: 'Slack',
            description: 'Collaboration hub for teams to communicate and share files in real-time across different devices and platforms',
            dateCreated: '2021-12-18T18:55:15.000Z', // Random date within the range
            createdBy: 3
        },
        {
            id: 8, title: 'Spotify',
            description: 'Music streaming service with a vast library of songs, podcasts, and audiobooks available on demand',
            dateCreated: '2016-04-02T09:40:05.000Z', // Random date within the range
            createdBy: 2
        },
        {
            id: 9, title: 'Trello',
            description: 'Project management tool with boards, lists, and cards to organize tasks and track progress in real-time',
            dateCreated: '2018-08-23T15:50:40.000Z', // Random date within the range
            createdBy: 1
        },
        {
            id: 10, title: 'Notion',
            description: 'All-in-one workspace for notes, tasks, wikis, and databases with powerful collaboration features and integrations',
            dateCreated: '2019-06-10T11:35:55.000Z', // Random date within the range
            createdBy: 3
        },
        {
            id: 11, title: 'Visual Studio Code',
            description: 'Free source-code editor made by Microsoft for Windows, Linux and macOS. Features include support for debugging, syntax highlighting, intelligent code completion, snippets, code refactoring, and embedded Git',
            dateCreated: '2017-03-25T13:25:20.000Z', // Random date within the range
            createdBy: 2
        },
        {
            id: 12,
            title: 'Sublime Text',
            description: 'A sophisticated text editor for code, markup and prose. You\'ll love the slick user interface, extraordinary features and amazing performance.',
            dateCreated: '2016-09-08T17:00:15.000Z', // Random date within the range
            createdBy: 1
        },
        {
            id: 13,
            title: 'Atom',
            description: 'A hackable text editor for the 21st Century. At GitHub, we\'re building the text editor we\'ve always wanted. Hackable to the core, but approachable on the first day without ever touching a config file.',
            dateCreated: '2020-01-30T19:45:05.000Z', // Random date within the range
            createdBy: 3
        },
        {
            id: 14,
            title: 'Brave Browser',
            description: 'A free and open-source web browser developed by Brave Software Inc. based on the Chromium web browser. It blocks ads and website trackers while providing a way for users to send cryptocurrency contributions in the form of Basic Attention Tokens to websites and content creators.',
            dateCreated: '2019-04-15T16:55:30.000Z', // Random date within the range
            createdBy: 2
        },
        {
            id: 15,
            title: 'Audacity',
            description: 'A free open source digital audio editor and recording computer software project available for Windows macOS/OS X and Unix-like operating systems.',
            dateCreated: '2016-11-28T12:10:40.000Z', // Random date within the range
            createdBy: 1
        },
        {
            id: 16,
            title: 'GIMP',
            description: 'A free and open-source raster graphics editor used for image retouching and editing free-form drawing converting between different image formats and more specialized tasks.',
            dateCreated: '2017-08-05T14:30:25.000Z', // Random date within the range
            createdBy: 3
        }
    ],
    companies: [
        {
            id: '1', name: 'Cognitive Factory',
            projects: [1, 2, 5, 7, 9],
            description: 'Software edition company focused on makin businesses more efficient through high quality and high impact software.'
        },
        { id: '2', name: 'Solimi', description: 'FinTech company with the goal of making digital money transactions mainstream and more affordable' },
    ],
    users: [
        { id: 1, name: 'GATIEN GNAKOU', email: 'spadmin@gmail.com', password: 'Admin123#', roles: ['admin'] },
        { id: 2, name: 'Clement LOTSU' },
        { id: 3, name: 'Abraham GNAWOLOU' }
    ],
    roles: [
        { id: '1', code: 'admin', nom: 'Administrateur', description: 'Administrateur' },
        { id: '2', code: 'mod', nom: 'Moderateur', description: 'Moderateur' },
        { id: '3', code: 'agent', nom: 'Agent', description: 'Agent' },
        { id: '4', code: 'client', nom: 'Client', description: 'Client' },
    ],
    rolesAffectations: [
        { id: 1, userId: 1, roleId: 1, startDate: '2023/10/27', endDate: null }
    ]
}