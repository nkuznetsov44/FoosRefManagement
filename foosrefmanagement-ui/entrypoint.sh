#!/bin/sh
if [ -z "$TELEGRAM_BOT_NAME" ]; then echo 'Environment variable TELEGRAM_BOT_NAME must be specified. Exiting.'; exit 1; fi