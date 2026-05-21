<?php

namespace App\Database;

use Illuminate\Database\PostgresConnection as BasePostgresConnection;
use DateTimeInterface;

class PostgresConnection extends BasePostgresConnection
{
    /**
     * Prepare the query bindings for execution.
     *
     * @param  array  $bindings
     * @return array
     */
    public function prepareBindings(array $bindings)
    {
        $grammar = $this->getQueryGrammar();

        foreach ($bindings as $key => $value) {
            if ($value instanceof DateTimeInterface) {
                $bindings[$key] = $value->format($grammar->getDateFormat());
            } elseif (is_bool($value)) {
                // Convert PHP booleans to 'true'/'false' strings for PostgreSQL compatibility
                // when PDO::ATTR_EMULATE_PREPARES is set to true.
                $bindings[$key] = $value ? 'true' : 'false';
            }
        }

        return $bindings;
    }
}
