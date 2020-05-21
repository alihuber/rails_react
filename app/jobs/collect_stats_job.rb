# frozen_string_literal: true

class CollectStatsJob
  def self.perform(*_args)
    Resque::Scheduler.logger.info('#### info collect')
  end
end
