"""add optional(str or List[str]) en/uk size (JSON type) && en/uk weight

Revision ID: 193ed6b6f6cd
Revises: c369db024387
Create Date: 2025-01-25 21:31:40.752845

"""
from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision = '193ed6b6f6cd'
down_revision = 'c369db024387'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('product', sa.Column('size_en', sa.JSON(), nullable=False))
    op.add_column('product', sa.Column('size_uk', sa.JSON(), nullable=False))
    op.add_column('product', sa.Column('weight_en', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=True))
    op.add_column('product', sa.Column('weight_uk', sqlmodel.sql.sqltypes.AutoString(length=50), nullable=True))
    op.create_index(op.f('ix_product_category'), 'product', ['category'], unique=False)
    op.drop_column('product', 'weight')
    op.drop_column('product', 'size')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('product', sa.Column('size', sa.VARCHAR(length=50), autoincrement=False, nullable=False))
    op.add_column('product', sa.Column('weight', sa.VARCHAR(length=50), autoincrement=False, nullable=True))
    op.drop_index(op.f('ix_product_category'), table_name='product')
    op.drop_column('product', 'weight_uk')
    op.drop_column('product', 'weight_en')
    op.drop_column('product', 'size_uk')
    op.drop_column('product', 'size_en')
    # ### end Alembic commands ###
