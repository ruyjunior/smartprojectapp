import { BuildingOfficeIcon, CheckIcon, ClockIcon, PresentationChartBarIcon } from '@heroicons/react/24/outline';
import { fetchCardData, fetchCardDataCurrentUser } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts';
import { CurrentUser } from '@/app/utils/utils';

const iconMap = {
  clients: BuildingOfficeIcon,
  tasksDone: CheckIcon,
  tasksStop: ClockIcon,
  projects: PresentationChartBarIcon,
};

export default async function CardWrapper() {
  const currentUser = await CurrentUser();

  let numberOfTasksDone = 0;
  let numberOfTasksStop = 0;
  let numberOfClients = 0;
  let numberOfProjects = 0;

  if (currentUser.role === 'admin') {
    numberOfTasksDone = (await fetchCardData()).numberOfTasksDone;
    numberOfTasksStop = (await fetchCardData()).numberOfTasksStop;
    numberOfClients = (await fetchCardData()).numberOfClients;
    numberOfProjects = (await fetchCardData()).numberOfProjects;
  } else {
    numberOfTasksDone = (await fetchCardDataCurrentUser()).numberOfTasksDone;
    numberOfTasksStop = (await fetchCardDataCurrentUser()).numberOfTasksStop;
    numberOfClients = (await fetchCardDataCurrentUser()).numberOfClients;
    numberOfProjects = (await fetchCardDataCurrentUser()).numberOfProjects;
  }

  return (
    <>
      <Card title="Total Projects" value={numberOfProjects} type="projects" />
      <Card title="Total Tasks Done" value={numberOfTasksDone} type="tasksDone" />
      <Card title="Total Tasks Stopped" value={numberOfTasksStop} type="tasksStop" />
      <Card title="Total Clients" value={numberOfClients} type="clients" />
    </>
  );
}

export function Card({ title, value, type }: {
  title: string;
  value: number | string;
  type: 'tasksDone' | 'tasksStop' | 'clients' | 'projects';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
