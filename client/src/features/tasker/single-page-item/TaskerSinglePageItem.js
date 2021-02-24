import React from 'react';
import DeviceList from 'features/tasker/single-page-item/device-list/DeviceList';
import TaskerItemTextEditables from 'features/tasker/single-page-item/TaskerItemTextEditables';
import BackButton from 'features/tasker/single-page-item/BackButton';
import TaskerItemText from 'features/tasker/single-page-item/TaskerItemText';
import TaskerItemControls from 'features/tasker/single-page-item/TaskerItemControls';
import ProgressOverview from 'features/tasker/single-page-item/progress-overview/ProgressOverview';
import ScrollToDevicesBtn from 'features/tasker/single-page-item/ScrollToDevicesBtn';

const TaskerSinglePageItem = ({ id, isEditing }) => {
  return (
    <div className='tasker-single-page-item'>
      <BackButton isEditing={isEditing} />
      <div className='section'>
        {isEditing ? (
          <TaskerItemTextEditables id={id} />
        ) : (
          <TaskerItemText id={id} />
        )}
        {!isEditing && <TaskerItemControls id={id} />}
      </div>
      {!isEditing && <ProgressOverview id={id} />}
      <DeviceList
        id={id}
        isEditing={isEditing}
        scrollToBtn={handleClick => (
          <ScrollToDevicesBtn handleClick={handleClick} />
        )}
      />
    </div>
  );
};

export default TaskerSinglePageItem;
