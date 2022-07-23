cd $(dirname $0)
if [ ${CI:=0} -ne 1 -a -d ../node_modules/husky ]; then
    pnpm husky install
    pnpm prisma generate
fi
