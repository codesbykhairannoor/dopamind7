<?php

namespace App\Enums;

enum HabitStatus: string
{
    case COMPLETED = 'completed';
    case SKIPPED = 'skipped';
    case UNCHECK = 'uncheck';
}
